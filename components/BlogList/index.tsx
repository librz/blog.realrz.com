"use client";

import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { PostMeta } from "~/lib/posts";
import SearchBar from "./SearchBar";

interface IProps {
  blogs: PostMeta[];
}

const BlogList: FC<IProps> = ({ blogs }) => {
  const [search, setSearch] = useState("");

  const displayBlogs = useMemo(() => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      const aTs = new Date(a.date).getTime();
      const bTs = new Date(b.date).getTime();
      return bTs - aTs;
    });

    if (!search.trim()) return sortedBlogs;

    return sortedBlogs.filter((blog) => {
      return blog.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [blogs, search]);

  if (displayBlogs.length === 0) {
    return (
      <div>
        <SearchBar onChange={setSearch} />
        <div className="text-center py-16 text-stone-400">
          <p className="text-lg mb-1">No articles found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar onChange={setSearch} />
      <div className="flex flex-col gap-3">
        {displayBlogs.map((blog) => (
          <Link
            href={`/${blog.slug}`}
            key={blog.slug}
            className="group flex items-center justify-between px-5 py-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all"
          >
            <div className="min-w-0">
              <h3 className="text-stone-800 font-medium text-base truncate group-hover:text-indigo-700 transition-colors">
                {blog.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <time className="text-stone-400 text-sm">
                  {blog.date}
                </time>
                <span className="text-stone-300">·</span>
                <span className="text-stone-400 text-sm capitalize">
                  {blog.category}
                </span>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-stone-300 group-hover:text-indigo-500 transition-colors flex-shrink-0 ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
