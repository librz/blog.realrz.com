import { FC } from 'react'
import { IBlog } from 'interface';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import BlogList from 'components/BlogList';

const App: FC = () => {
  const contentsPath = path.join(process.cwd(), 'contents')

  const files: string[] = fs.readdirSync(contentsPath, "utf-8");

  // get meta data of all blogs in contents folder
  const blogs: IBlog[] = files
    .filter(file => file.endsWith(".md"))
    .map(file => {
      const filePath = path.join(contentsPath, file);
      const rawContent = fs.readFileSync(filePath, { encoding: "utf-8" });
      const { data } = matter(rawContent); // only get the meta data
      const slug = file.replace(".md", "");
      return { ...data as any, slug };
    });
  // return { props: { blogs } };
  return (
    <>
      <h1 className='text-2xl font-bold my-4'>Blog Posts</h1>
      <BlogList blogs={blogs} />
    </>
  )
}

export default App;
