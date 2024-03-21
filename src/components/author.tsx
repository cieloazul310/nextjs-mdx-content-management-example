import NextLink from "next/link";
import type { Author as AuthorSchema } from "@/content";

function Author({ id, name, description, image, socials }: AuthorSchema) {
  return (
    <article>
      <h1>
        <NextLink href={`/author/${id}`}>{name}</NextLink>
      </h1>
      {description && <p>{description}</p>}
    </article>
  );
}

export default Author;
