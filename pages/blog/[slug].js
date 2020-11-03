import React from "react";

function BlogPostPage(props) {
  const { title, content } = props.blog;
  return (
    <div>
      <h1>{title}</h1>
      <section dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export async function getStaticProps(context) {
  const fs = require("fs");
  const html = require("remark-html");
  const highlight = require("remark-highlight.js");
  const unified = require("unified");
  const markdown = require("remark-parse");
  const matter = require("gray-matter");

  const { slug } = context.params;
  const path = `${process.cwd()}/contents/${slug}.md`;
  const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
  const { data, content } = matter(rawContent);
  const result = await unified()
    .use(markdown)
    .use(highlight)
    .use(html)
    .process(content);

  return {
    props: {
      blog: {
        ...data,
        content: result.toString(),
      },
    },
  };
}

export async function getStaticPaths() {
  const fs = require("fs");
  const path = `${process.cwd()}/contents`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownNames = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownNames.map((fn) => ({
      params: { slug: fn },
    })),
    fallback: false,
  };
}

export default BlogPostPage;
