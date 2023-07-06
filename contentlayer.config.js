import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { codeHighlightOptions } from "./lib/codeHighlightOptions";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import toc from "@jsdevtools/rehype-toc";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "string",
      description: "The date of the post",
      required: true,
    },
    language: {
      type: "string",
      description: "The language of the post",
      required: true,
    },
    category: {
      type: "string",
      description: "The category of the post",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      toc,
      [rehypePrettyCode, codeHighlightOptions],
    ],
  },
});
