
import styles from '../../styles/Slug.module.css'
import { GraphQLClient, gql } from 'graphql-request'

const graphcms = new GraphQLClient('graphcms Content Api')

const QUERY = gql`
    query Post($slug: String!) {
        postPractice(where: {slug: $slug}) {
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
                id
                url
            }
        }
    }
`;

const SLUGLIST = gql`{
    postPractices {
        slug
    }
}`

export async function getStaticPaths() {
    const { postPractices } = await graphcms.request(SLUGLIST);
    return {
        paths: postPractices.map((postPractice) => ({ params: { slug: postPractice.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    const data = await graphcms.request(QUERY, { slug });
    const postPractices = data.postPractice;

    return {
        props: {
        postPractice,
        },
        revalidate: 60,
    };
}

export default function BlogPost({ postPractice }) {
    return(
        <main className={styles.blog}>
            <img src={postPractice.coverPhoto.url} classNamej={styles.cover} alt={postPractice.title} />
            <div className={styles.title}>
                <div className={styles.authdetails}>
                    <img src={postPractice.author.avatar.url} alt={postPractice.author.name} />
                    <div className={styles.authtext}>
                        <h6>By {postPractice.author.name}</h6>
                        <h6 className={styles.date}>
                        {postPractice.datePublished}
                        </h6>
                    </div>
                </div>
            </div>
            <h2>{postPractice.title}</h2>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: postPractice.content.html }}></div>
        </main>
    )
}