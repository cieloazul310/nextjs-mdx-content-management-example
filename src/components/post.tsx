import NextLink from "next/link";
import type { PostMetadata } from "@/content";
import styles from "./post.module.css";

function Post({
  href,
  title,
  date,
  author,
}: Pick<PostMetadata, "href" | "title" | "date" | "author">) {
  return (
    <article key={href} className={styles.post}>
      <h1>
        <NextLink href={href}>{title}</NextLink>
      </h1>
      <p>
        <time>{date.toDateString()}</time> by {author}
      </p>
    </article>
  );
}

export default Post;
