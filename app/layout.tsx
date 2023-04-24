import Link from "next/link";
import GithubLogo from "assets/github.svg";
import Image from "next/image";
import "lxgw-wenkai-webfont/style.css";
import "./global.css";

export const metadata = {
  title: "blog.realrz.com",
  description: "Have Fun Coding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="h-14 px-8 w-full bg-neutral-900 shadow flex items-center justify-between text-gray-300">
          <Link href={"/"}>Home</Link>
          <Link
            href={"https://github.com/librz/blog.realrz.com"}
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            <Image
              priority
              src={GithubLogo}
              alt="Github"
              width={24}
            />
          </Link>
        </header>
        <main className="min-h-screen flex flex-col items-center pt-4 pb-8 px-6">{children}</main>
        <footer className="h-14 w-full bg-neutral-900 shadow flex items-center justify-center text-gray-300">
          <Link href={"https://www.buymeacoffee.com/realrz"} target="_blank" style={{ textDecoration: "underline" }}>
            Buy me a coffee
          </Link>
        </footer>
      </body>
    </html>
  );
}
