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
        <main className="min-h-screen flex flex-col items-center pt-4 pb-8">{children}</main>
        <footer className="h-14 w-full bg-neutral-900 shadow flex items-center justify-center text-gray-300">
          Copyright &#169; {new Date().getFullYear()} realrz
        </footer>
      </body>
    </html>
  );
}
