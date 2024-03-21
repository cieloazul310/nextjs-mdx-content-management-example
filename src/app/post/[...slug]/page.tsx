import NextLink from "next/link";
import { Author, Post, VStack } from "@/components";
import { author, post } from "@/content";
import { useMDXComponents } from "@/mdx-components";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const allPosts = await post.getAll();
  return allPosts;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const { title } = await post.get(slug);
  return {
    title,
  };
}

async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const components = useMDXComponents();
  const { content, frontmatter, context } = await post.useMdx(slug, {
    components,
  });
  const { title, date, lastmod } = frontmatter;
  const modified = date.getTime() !== lastmod.getTime();
  const authorItem = await author.get("name", frontmatter.author);
  /*
  const category = await categories.get("title", frontmatter.category);
  */

  return (
    <>
      <article>
        <header className={styles.header}>
          <hgroup className={styles.hgroup}>
            <h1>{title}</h1>
            <p className={styles.titleFooter}>
              <time>{date.toDateString()}</time>
              {authorItem && (
                <span>
                  by{" "}
                  <NextLink href={`/author/${authorItem.id}`}>
                    {authorItem.name}
                  </NextLink>
                </span>
              )}
            </p>
          </hgroup>
        </header>
        <div className="article">{content}</div>
        <footer className={styles.footer}>
          <div>
            <h2>{title}</h2>
            <p>
              Post:
              <time>{date.toDateString()}</time>
            </p>
            {modified && (
              <p>
                Last modified:
                <time>{lastmod.toDateString()}</time>
              </p>
            )}
          </div>
          {authorItem && <Author {...authorItem} />}
        </footer>
      </article>
      <VStack>
        {context.newer && (
          <div>
            <p>Newer post</p>
            <Post {...context.newer} />
          </div>
        )}
        {context.older && (
          <div>
            <p>Older post</p>
            <Post {...context.older} />
          </div>
        )}
      </VStack>
    </>
  );
}

export default Page;
