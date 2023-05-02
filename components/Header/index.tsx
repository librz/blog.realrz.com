import { FC } from "react";
import Link from "next/link";
import GithubLogo from "assets/github.svg";
import Image from "next/image";

const Header: FC = () => {
  return (
    <header className="h-14 px-8 w-full bg-neutral-900 shadow flex items-center justify-between text-gray-300">
      <Link href={"/"}>Home</Link>
      <Link
        href={"https://github.com/librz/blog.realrz.com"}
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        <Image priority src={GithubLogo} alt="Github" width={24} />
      </Link>
    </header>
  );
};

export default Header;
