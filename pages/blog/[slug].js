import React from "react";

function BlogPostPage({ title, date, htmlString }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{title}</h2>
        <div>{date}</div>
      </div>
      <section dangerouslySetInnerHTML={{ __html: htmlString }} />
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

  const { slug } = context.params; // params <- getStaticPaths
  const path = `${process.cwd()}/contents/${slug}.md`;
  const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
  const { data, content } = matter(rawContent); // transfer markdown into metadata and content
  const result = await unified().use(markdown).use(highlight).use(html).process(content);

  return {
    props: {
      ...data,
      htmlString: result.toString(),
    },
  };
}

export async function getStaticPaths() {
  const fs = require("fs");
  const path = `${process.cwd()}/contents`;
  const files = fs.readdirSync(path, "utf-8");

  const slugs = files.filter(fn => fn.endsWith(".md")).map(fn => fn.replace(".md", ""));

  return {
    paths: slugs.map(slug => ({
      params: { slug },
    })),
    fallback: true,
  };
}

export default BlogPostPage;
