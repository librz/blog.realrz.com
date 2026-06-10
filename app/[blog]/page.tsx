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
  params: Promise<{ blog: string }>;
}) {
  const { blog } = await params;
  const post = getPostBySlug(blog);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-10 pb-8 border-b border-stone-200">
        <div className="flex items-center gap-3 text-sm text-stone-400 mb-4">
          <time>{post.date}</time>
          <span>·</span>
          <span className="capitalize">{post.category}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
          {post.title}
        </h1>
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            scope: HeroIcons,
            blockJS: false,
            blockDangerousJS: false,
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
      </div>
    </article>
  );
}
