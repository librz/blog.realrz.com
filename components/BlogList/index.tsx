'use client'
import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { IBlog } from "interface";
import SearchBar from "./SearchBar";

interface IProps {
  blogs: IBlog[];
}

const BlogList: FC<IProps> = ({ blogs }) => {
  const [search, setSearch] = useState("");
  const displayBlogs = useMemo(() => {
    const sortedBlogs = (JSON.parse(JSON.stringify(blogs)) as IBlog[]).sort(
      (a, b) => {
        const aTs = new Date(a.date).getTime();
        const bTs = new Date(b.date).getTime();
        return bTs - aTs;
      }
    );
    return sortedBlogs.filter(blog => {
    return blog.title.toLowerCase().includes(search.toLowerCase());
  })}, [blogs, search])
  return (
    <div>
      <SearchBar onChange={e => { setSearch(e.target.value) }} />
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3`}>
        {displayBlogs.map((blog, index) => {
          const { slug, title, date } = blog;
          return (
            <Link
              href={`/${slug}`}
              key={index}
              className="group cursor-pointer p-4 rounded-md border-2 border-gray-200 hover:bg-gradient-to-r from-violet-600 to-purple-800"
            >
              <span className="text-sm text-gray-600 group-hover:text-gray-200">{date}</span>
              <div className="text-lg text-zinc-700 group-hover:text-white">{title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
