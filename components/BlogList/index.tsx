import { FC } from "react";
import Link from "next/link";
import localFont from "next/font/local"
import { IBlog } from "interface";

interface IProps {
  blogs: IBlog[];
}

const myFont = localFont({
  src: '../../assets/YSHaoShenTi-2.ttf',
  display: 'swap'
});

const BlogList: FC<IProps> = ({ blogs }) => {
  const sortedBlogs = (JSON.parse(JSON.stringify(blogs)) as IBlog[]).sort(
    (a, b) => {
      const aTs = new Date(a.date).getTime();
      const bTs = new Date(b.date).getTime();
      return bTs - aTs;
    }
  );
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${myFont.className}`}>
      {sortedBlogs.map((blog, index) => {
        const { slug, title, date } = blog;
        return (
          <Link
            href={`/${slug}`}
            key={index}
            className="group cursor-pointer p-4 rounded-md border-2 border-gray-200 hover:bg-gradient-to-r from-violet-500 to-fuchsia-500"
          >
            <span className="text-sm text-gray-600 group-hover:text-gray-200">{date}</span>
            <div className="text-lg text-zinc-700 group-hover:text-white">{title}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
