import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  language: string;
  category: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

function stripImports(content: string): string {
  const lines = content.split("\n");
  let insideCodeBlock = false;
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      insideCodeBlock = !insideCodeBlock;
      result.push(line);
      continue;
    }
    if (
      !insideCodeBlock &&
      (trimmed.startsWith("import ") || trimmed.startsWith("export "))
    ) {
      continue;
    }
    result.push(line);
  }

  return result.join("\n");
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        language: data.language,
        category: data.category,
      };
    });

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => name === `${slug}.mdx`);

  if (!fileName) {
    return undefined;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: data.title,
    date: data.date,
    language: data.language,
    category: data.category,
    content: stripImports(content),
  };
}
