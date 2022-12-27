import React, { FC } from "react";
import AppWrapper from "../components/AppWrapper";
import BlogList from "../components/BlogList";
import Head from "next/head";
import { IBlog } from "../interface";

interface IProps {
  blogs: IBlog[];
}

const IndexPage: FC<IProps> = ({ blogs }) => {
  return (
    <AppWrapper>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Have Fun Coding</title>
      </Head>
      <BlogList blogs={blogs} />
    </AppWrapper>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");

  const files: string[] = fs.readdirSync(`${process.cwd()}/contents`, "utf-8");

  // get meta data of all blogs in contents folder
  const blogs: IBlog[] = files
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const path = `${process.cwd()}/contents/${file}`;
      const rawContent = fs.readFileSync(path, { encoding: "utf-8" });
      const { data } = matter(rawContent); // only get the meta data
      const slug = file.replace(".md", "");
      return { ...data, slug };
    });
  return { props: { blogs } };
}

export default IndexPage;
