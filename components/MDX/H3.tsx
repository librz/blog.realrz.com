import { FC } from "react";
import Image from "next/image";

interface IProps {
  children: string;
}

const H2: FC<IProps> = ({ children }) => {
  const anchor = children.trim();
  const link = `#${anchor}`;
  return (
    <h2 id={anchor} className="relative group">
      <a
        href={link}
        className="absolute -left-8 h-full flex justify-center align-center opacity-0 group-hover:opacity-100"
      >
        <Image
          priority
          width={24}
          height={24}
          className="m-0"
          src="/images/anchor.svg"
          alt="achor tag"
        />
      </a>
      {children}
    </h2>
  );
};

export default H2;
