import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type IProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
};

const CustomLink = (props: IProps) => {
  const href = props.href;

  // If the href is a relative URL, use Next.js Link component
  if (href.startsWith("/")) {
    return <Link {...props}>{props.children}</Link>;
  }

  // If the href is a page anchor, use a regular anchor tag
  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  // Otherwise, assume the href is an external link and add target and rel attribute
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export default CustomLink;
