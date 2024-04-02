"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import CustomLink from "./CustomLink";

const mdxComponents: MDXComponents = {
  // h3: (props) => <Heading as="h3" {...props} />,
  a: CustomLink,
};

export default function Mdx({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent components={mdxComponents} />;
}
