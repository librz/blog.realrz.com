import React from "react";
import Link from "next/link";

function IndexPage({ blogs }) {
  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map(({ id, slug, title }) => {
          return (
            <li key={id}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/contents`, "utf-8");

  const blogs = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/contents/${fn}`;
      const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
      const { data } = matter(rawContent);
      return { ...data, id: uuid() };
    });
  return { props: { blogs } };
}

export default IndexPage;
