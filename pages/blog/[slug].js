import React from "react";
// using default style from hightlight.js
import "highlight.js/styles/vs2015.css";

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
  const matter = require("gray-matter"); // transfer markdown text into an object with data attr as metadata and content as the actually content
  const unified = require("unified");
  // a bunch of middlewares
  const markdown = require("remark-parse"); // parsing markdown using remark
  const remark2rehype = require("remark-rehype"); // bridge between remark and rehype
  const doc = require("rehype-document"); // parse html using rehype
  const html = require("rehype-stringify"); // stringify
  const highlight = require("rehype-highlight"); // code highlighting by injecting class names into html

  const { slug } = context.params; // params <- getStaticPaths
  const path = `${process.cwd()}/contents/${slug}.md`;
  const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
  const { data, content } = matter(rawContent);
  const { contents: htmlString } = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc, { title: data["title"] })
    .use(html)
    .use(highlight)
    .process(content);

  return {
    props: {
      ...data,
      htmlString,
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
