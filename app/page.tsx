import { FC } from "react";
import BlogList from "components/BlogList";
import { allPosts } from "contentlayer/generated";

const HomePage: FC = () => {
  return (
    <div>
      <BlogList blogs={allPosts} />
    </div>
  );
};

export default HomePage;
