import Link from 'next/link'
import Image from "next/image"
import styles from "../styles/BlogCard.module.css"

export default function BlogCard({ title, author, coverPhoto, datePublished, slug }) {
    return (
        <div className={styles.card}>
            <Link href={`/postPractices/${slug}`}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto?.url || 'https://media.graphassets.com/SiX4rum0RryN3SXLzRqq'} alt="blog post cover photo" />
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar?.url || 'https://media.graphassets.com/SiX4rum0RryN3SXLzRqq'} alt={author.name} />
                        <h3>{author.name}</h3>
                    </div>
                    <div className={styles.date}>
                        <h3>{datePublished}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}