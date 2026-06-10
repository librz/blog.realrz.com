import BlogList from "components/BlogList";
import { getAllPosts } from "~/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <div>
      <BlogList blogs={posts} />
    </div>
  );
}
