import { Author, VStack } from "@/components";
import { author } from "@/content";

async function Page() {
  const allAuthors = await author.getAll();

  return (
    <VStack>
      {allAuthors.map((data) => (
        <Author key={data.id} {...data} />
      ))}
    </VStack>
  );
}

export default Page;
