import React from "react";
import Link from "next/link";
import { List } from "antd";
import "antd/dist/antd.css";

function IndexPage({ blogs }) {
  return (
    <List
      header={<h2>Blogs</h2>}
      dataSource={blogs.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })}
      renderItem={(blog) => {
        const { slug, title, date } = blog;
        return (
          <List.Item style={{ display: "block" }}>
            <div style={{ fontSize: 14, opacity: 0.6 }}>{date}</div>
            <Link href={`/${slug}`}>
              <a style={{ fontSize: 18 }}>{title}</a>
            </Link>
          </List.Item>
        );
      }}
      bordered
      style={{ margin: "3rem auto", width: 1200, maxWidth: "90vw" }}
    />
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/contents`, "utf-8");

  // get meta data of all blogs in contents folder
  const blogs = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/contents/${fn}`;
      const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
      const { data } = matter(rawContent); // only get the meta data
      const slug = fn.replace(".md", "");

      return { ...data, slug };
    });
  return { props: { blogs } };
}

export default IndexPage;
