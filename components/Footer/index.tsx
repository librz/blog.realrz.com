import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="h-14 w-full bg-neutral-900 shadow flex items-center justify-center text-gray-300">
      <Link
        href={"https://www.buymeacoffee.com/realrz"}
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        Buy me a coffee
      </Link>
    </footer>
  );
};

export default Footer;
