import { FC } from "react";

interface IProps {
  id: string;
  children: any;
}

const Title: FC<IProps> = ({ id, children }) => {
  return (
    <a id={id} href={`#${id}`} style={{ textDecoration: "none" }}>
      {children}
    </a>
  );
};

export default Title;
