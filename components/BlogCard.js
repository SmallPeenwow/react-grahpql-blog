import Link from 'next/link'
import Image from "next/image"
import styles from "../styles/BlogCard.module.css"

export function BlogCard({ title, author, coverPhoto, datePublished, slug }) {
    return (
        <div className={styles.card}>
            <Link>
                <div className={styles.imgContainer}>
                    <Image src={coverPhoto.url} alt="blog post cover photo" />
                </div>
            </Link>
        </div>
    )
}