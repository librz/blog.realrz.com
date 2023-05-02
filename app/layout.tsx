import Header from "~/components/Header";
import Footer from "~/components/Footer";
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
        <Header />
        <main className="min-h-screen flex flex-col items-center pt-4 pb-8 px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
