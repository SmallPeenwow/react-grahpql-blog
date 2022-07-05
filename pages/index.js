import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import BlogCard from "../components/BlogCard"

const graphcms = new GraphQLClient('graphcms Content Api')

const QUERY = gql`{
  postPractices {
    id
    title
    datePublished
    slug
    content {
      html
    }
    author {
      name
      avatar{
        url
      }
    }
    coverPhoto {
      publishedAt
        createdBy {
          id
        }
        url
    }
  }
}`;

export async function getStaticProps() {
  const {postPractices} = await graphcms.request(QUERY);

  return {
    props: {
      postPractices,
    },
    revalidate: 60,
  };
}

export default function Home({postPractices}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {postPractices.map((post) => (
          <BlogCard title={post.title} author={post.author} coverPhoto={post.coverPhoto} key={post.key} datePublished={post.datePublished} slug={post.slug} />
        ))}
      </main>

    </div>
  )
}
