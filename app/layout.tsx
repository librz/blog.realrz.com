import "./global.css"

export const metadata = {
  title: 'blog - realrz',
  description: 'Have Fun Coding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center my-4">
          {children}
        </main>
        <footer className="fixed bottom-0 h-14 w-full bg-neutral-900 flex items-center justify-center text-gray-300">
          Copyright &#169; {(new Date()).getFullYear()} realrz
        </footer>
      </body>
    </html>
  )
}
