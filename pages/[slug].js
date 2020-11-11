import React from "react";
import AppWrapper from "../components/AppWrapper";
// import theme from hightlight.js
import "highlight.js/styles/vs2015.css";

// render using react
function BlogPostPage({ title, htmlString }) {
  return (
    <AppWrapper
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        lineHeight: 1.6,
        fontSize: "1.2em",
        letterSpacing: 0.4,
        textAlign: "justify",
        wordBreak: "break-all",
      }}
    >
      <h2 style={{ textAlign: "center", color: "royalblue" }}>{title}</h2>
      <section dangerouslySetInnerHTML={{ __html: htmlString }} />
    </AppWrapper>
  );
}

// grap the markdown file matching corresponding slug, parse it to html string
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

// grab all the slugs corresponding to markdown files
// and pre-render them all at build time
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
