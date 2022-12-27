export interface IBlog {
  slug: string;
  title: string;
  date: string;
  language: "zh-CN" | "en-US";
  category: "javascript" | "react" | "linux" | "other";
}