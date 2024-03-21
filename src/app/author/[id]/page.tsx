import { Post, VStack } from "@/components";
import { author, post } from "@/content";

export async function generateStaticParams() {
  const allAuthor = await author.getAll();
  return allAuthor;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await author.get("id", id);
  if (!item) return undefined;
  const { name } = item;
  return {
    title: name,
  };
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await author.get("id", id);
  if (!item) return null;
  const { name, description, image, socials } = item;
  const posts = await post.getAll();
  const authorsPosts = posts.filter((post) => post.author === name);

  return (
    <>
      <div>
        {image && (
          <figure>
            <img src={image} alt={name} />
          </figure>
        )}
        <h1>{name}</h1>
        {description && <p>{description}</p>}
        {socials && (
          <address>
            {socials.url && (
              <a href={socials.url} target="_blank" rel="noreferrer noopener">
                Web
              </a>
            )}
            {socials.twitter && (
              <a
                href={`https://twitter.com/${socials.twitter}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                Twitter
              </a>
            )}
            {socials.github && (
              <a
                href={`https://github.com/${socials.github}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
            )}
          </address>
        )}
      </div>
      <div>
        <h2>記事一覧</h2>
        <VStack>
          {authorsPosts
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((post) => (
              <Post key={post.href} {...post} />
            ))}
        </VStack>
      </div>
    </>
  );
}

export default Page;
