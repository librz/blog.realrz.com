export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-200 bg-white">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between text-sm text-stone-400">
        <span>© {new Date().getFullYear()} Realrz</span>
        <a
          href="https://www.buymeacoffee.com/realrz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-600 transition-colors"
        >
          Buy me a coffee
        </a>
      </div>
    </footer>
  );
}
