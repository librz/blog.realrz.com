import { FC, ReactNode, createElement } from "react";

interface IProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: ReactNode;
}

const Heading: FC<IProps> = ({ children = "", as = "h3" }) => {
  const anchor = (children?.toString() || "").trim();
  const link = `#${anchor}`;

  return (
    <a
      href={link}
      key={link}
      className="no-underline"
    >
      {
        createElement(as, { id: anchor, className: "border-l-4 border-indigo-500 pl-2" }, [children])
      }
    </a>
  )
};

export default Heading;
