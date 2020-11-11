import React from "react";
import Link from "next/link";
import { List } from "antd";

const BlogList = ({ blogs }) => {
  return (
    <List
      // header={<h2>I think, I code, I share</h2>}
      dataSource={blogs.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })}
      renderItem={blog => {
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
      // style={{ margin: "0 auto", width: 800, maxWidth: "86vw" }}
    />
  );
};

export default BlogList;
