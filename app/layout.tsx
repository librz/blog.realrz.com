import type { Metadata } from "next";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "./global.css";

export const metadata: Metadata = {
  title: { default: "Realrz", template: "%s — Realrz" },
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
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
