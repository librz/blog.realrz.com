import React from "react";
import Link from "next/link";

function IndexPage({ blogs }) {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map(({ id, slug, title, date }) => {
          return (
            <li key={id}>
              <Link href={`/blog/${slug}`}>
                <a>{`${title} ${date}`}</a>
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

  // get meta data of all blogs in contents folder
  const blogs = files
    .filter(fn => fn.endsWith(".md"))
    .map(fn => {
      const path = `${process.cwd()}/contents/${fn}`;
      const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
      const { data } = matter(rawContent); // only get the meta data
      const slug = fn.replace(".md", "");

      return { ...data, slug, id: uuid() };
    });
  return { props: { blogs } };
}

export default IndexPage;
