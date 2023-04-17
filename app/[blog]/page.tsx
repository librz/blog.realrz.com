import fs from 'fs'
import matter from "gray-matter"; // transfer markdown text into an object with data attr as metadata and content as the actually content
import { unified } from "unified";
import markdown from "remark-parse"; // parsing markdown using remark
import remark2rehype from "remark-rehype"; // bridge between remark and rehype
import doc from "rehype-document"; // parse to html using rehype
import html from "rehype-stringify"; // stringify
import highlight from "rehype-highlight"; // code highlighting by injecting class names into html
// import theme from hightlight.js
import "highlight.js/styles/vs2015.css";

const Blog = async (props) => {

  const blog = props["params"]?.["blog"];

  if (!blog) {
    return (
      <div>Blog Not Found</div>
    )
  }

  const path = `${process.cwd()}/contents/${blog}.md`;
  const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
  const { data, content } = matter(rawContent);
  const { value: htmlString } = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc, { title: data["title"] })
    .use(html)
    .use(highlight)
    .process(content);

  return (
    <article className='prose prose-lg prose-pre:py-1 prose-pre:px-2 my-4'>
      <h2 style={{ textAlign: "center", color: "royalblue" }}>{data["title"]}</h2>
      <section dangerouslySetInnerHTML={{ __html: htmlString as string }} />
    </article>
  )
}

export default Blog;
