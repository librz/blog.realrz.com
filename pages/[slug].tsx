import { CSSProperties } from "react";
const fs = require("fs");
import matter from "gray-matter"; // transfer markdown text into an object with data attr as metadata and content as the actually content
import { unified } from "unified";
import markdown from "remark-parse"; // parsing markdown using remark
import remark2rehype from "remark-rehype"; // bridge between remark and rehype
import doc from "rehype-document"; // parse html using rehype
import html from "rehype-stringify"; // stringify
import highlight from "rehype-highlight"; // code highlighting by injecting class names into html
import AppWrapper from "../components/AppWrapper";
import Head from "next/head";
// import theme from hightlight.js
import "highlight.js/styles/vs2015.css";

// render using react
function BlogPostPage({ title, htmlString }) {
  const style: CSSProperties = {
    fontFamily: "Arial, Helvetica, sans-serif",
    lineHeight: 1.6,
    fontSize: "1.2em",
    letterSpacing: 0.4,
    textAlign: "justify",
    wordBreak: "break-all",
  };
  return (
    <AppWrapper style={style}>
      <Head>
        <title>{title}</title>
      </Head>
      <h2 style={{ textAlign: "center", color: "royalblue" }}>{title}</h2>
      <section dangerouslySetInnerHTML={{ __html: htmlString }} />
    </AppWrapper>
  );
}

// grap the markdown file matching corresponding slug, parse it to html string
export async function getStaticProps(context) {
  // a bunch of middlewares

  const { slug } = context.params; // params <- getStaticPaths
  const path = `${process.cwd()}/contents/${slug}.md`;
  const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
  const { data, content } = matter(rawContent);
  const result = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc, { title: data["title"] })
    .use(html)
    .use(highlight)
    .process(content);

  return {
    props: {
      ...data,
      htmlString: result.value
    },
  };
}

// grab all the slugs corresponding to markdown files
// and pre-render them at build time
export async function getStaticPaths() {
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
