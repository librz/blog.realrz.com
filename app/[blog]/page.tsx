import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "~/lib/posts";
import CustomLink from "~/components/MDX/CustomLink";
import Collapse from "~/components/Collapse";
import { GridList } from "~/components/GridList";
import * as HeroIcons from "@heroicons/react/24/outline";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import toc from "@jsdevtools/rehype-toc";
import rehypePrettyCode from "rehype-pretty-code";
import { codeHighlightOptions } from "~/lib/codeHighlightOptions";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    blog: post.slug,
  }));
}

const components = {
  a: CustomLink,
  Collapse,
  GridList,
  ...HeroIcons,
};

export default async function BlogPost({
  params,
}: {
  params: { blog: string };
}) {
  const post = getPostBySlug(params.blog);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose max-w-full md:max-w-prose lg:prose-lg prose-img:rounded-lg my-4">
      <h2 className="text-indigo-600 text-center">{post.title}</h2>
      <MDXRemote
        source={post.content}
        components={components}
        options={{
          scope: HeroIcons,
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              rehypeAutolinkHeadings,
              toc,
              [rehypePrettyCode, codeHighlightOptions],
            ],
          },
        }}
      />
    </article>
  );
}
