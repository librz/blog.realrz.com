import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import CustomLink from "./CustomLink";
import H3 from "./H3";

const mdxComponents: MDXComponents = {
  h3: H3,
  a: CustomLink,
};

export default function Mdx({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={mdxComponents} />;
}
