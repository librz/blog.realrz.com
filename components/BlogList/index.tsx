import React, { FC } from "react";
import Link from "next/link";
import { IBlog } from "../../interface";
import styles from './index.module.css'

interface IProps {
  blogs: IBlog[]
}

const BlogList: FC<IProps> = ({ blogs }) => {
  const sortedBlogs = (JSON.parse(JSON.stringify(blogs)) as IBlog[]).sort((a, b) => {
    const aTs = (new Date(a.date)).getTime();
    const bTs = (new Date(b.date)).getTime();
    return bTs - aTs;
  });
  return (
    <div className={styles["blog-list"]}>
      {
        sortedBlogs.map((blog, index) => {
        const { slug, title, date } = blog;
          return (
            <Link href={`/${slug}`} key={index} className={styles["blog-item"]}>
              <span className={styles["blog-date"]}>{date}</span>
              <div className={styles["blog-title"]}>{title}</div>
            </Link>
          )
        })
      }
    </div>
  );
};

export default BlogList;
