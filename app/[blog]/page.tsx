import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import MDX from "~/components/MDX";

export default async function BlogPost({
  params,
}: {
  params: { blog: string };
}) {
  const post = allPosts.find((post) => post.slug === params.blog);

  if (!post) {
    notFound();
  }

  return (
    <article className='prose max-w-full md:max-w-prose lg:prose-lg prose-img:rounded-lg my-4'>
      <h2 style={{ textAlign: "center", color: "royalblue" }}>{post.title}</h2>
      <MDX code={post.body.code} />
    </article>
  )
}
