import { FC } from "react";

interface GridListItem {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IProps {
  items: GridListItem[];
}

const iconColors = [
  { fg: "text-teal-700", bg: "bg-teal-50" },
  { fg: "text-indigo-700", bg: "bg-indigo-50" },
  { fg: "text-sky-700", bg: "bg-sky-50" },
  { fg: "text-amber-700", bg: "bg-amber-50" },
  { fg: "text-rose-700", bg: "bg-rose-50" },
];

const GridList: FC<IProps> = ({ items }) => {
  return (
    <div className="not-prose my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, idx) => {
        const color = iconColors[idx % iconColors.length];
        const Icon = item.icon;

        return (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition-all"
          >
            <span
              className={`inline-flex rounded-lg p-2.5 ring-1 ring-stone-100 ${color.bg} ${color.fg} flex-shrink-0`}
            >
              <Icon className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h4 className="font-semibold text-stone-800 text-sm group-hover:text-indigo-700 transition-colors">
                {item.title}
              </h4>
              <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export { GridList };
