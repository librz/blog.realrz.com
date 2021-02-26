import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AppWrapper from "../components/AppWrapper";
import BlogList from "../components/BlogList";
import Head from "next/head";
import "antd/dist/antd.css";

function TabPanel({ children, show }) {
  return (
    <div hidden={!show} style={{ paddingTop: 20 }}>
      <Typography>{children}</Typography>
    </div>
  );
}

function IndexPage({ blogs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log({ newValue });
    setValue(newValue);
  };

  return (
    <AppWrapper>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Have Fun Coding</title>
      </Head>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="所有" value={0} />
          <Tab label="JS" value={1} />
          <Tab label="React" value={2} />
          <Tab label="Linux" value={3} />
          <Tab label="其他" value={4} />
        </Tabs>
      </AppBar>
      <TabPanel show={value === 0}>
        <BlogList blogs={blogs} />
      </TabPanel>
      <TabPanel show={value === 1}>
        <BlogList
          blogs={blogs.filter((item) => item.category === "javascript")}
        />
      </TabPanel>
      <TabPanel show={value === 2}>
        <BlogList blogs={blogs.filter((item) => item.category === "react")} />
      </TabPanel>
      <TabPanel show={value === 3}>
        <BlogList blogs={blogs.filter((item) => item.category === "linux")} />
      </TabPanel>
      <TabPanel show={value === 4}>
        <BlogList blogs={blogs.filter((item) => item.category === "other")} />
      </TabPanel>
    </AppWrapper>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");

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
