import NextLink from "next/link";
import { Author, Post, VStack, PageHeader, CategoryBadge } from "@/components";
import { author, post, categories } from "@/content";
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
  const category = await categories.get("name", frontmatter.category);

  return (
    <>
      <article>
        <PageHeader
          title={title}
          headerText={category && <CategoryBadge {...category} />}
          footerText={
            <>
              <time>{date.toDateString()}</time>
              {authorItem && (
                <span>
                  by{" "}
                  <NextLink href={`/author/${authorItem.id}`}>
                    {authorItem.name}
                  </NextLink>
                </span>
              )}
            </>
          }
        />
        <div className="article">{content}</div>
        <footer className={styles.footer}>
          <div className={styles.footerSummary}>
            {category && <CategoryBadge {...category} />}
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
        {context.older && (
          <div>
            <p>Older post</p>
            <Post {...context.older} />
          </div>
        )}
        {context.newer && (
          <div>
            <p>Newer post</p>
            <Post {...context.newer} />
          </div>
        )}
      </VStack>
    </>
  );
}

export default Page;
