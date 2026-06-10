import BlogList from "components/BlogList";
import { getAllPosts } from "~/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-3">
          Blog
        </h1>
        <p className="text-stone-500 leading-relaxed max-w-xl">
          Thoughts on software development, programming, and technology.
        </p>
      </div>
      <BlogList blogs={posts} />
    </div>
  );
}
