import type { Metadata } from "next";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "lxgw-wenkai-webfont/style.css";
import "./global.css";

export const metadata: Metadata = {
  title: "Blog - Realrz",
  description: "A blog about software development and other things.",
  keywords: ["blog", "software", "development", "realrz"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen flex flex-col items-center pt-4 pb-8 px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
