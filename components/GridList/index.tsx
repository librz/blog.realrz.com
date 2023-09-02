import { FC } from "react";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface GridListItem {
  title: string;
  href: string;
  description: string;
}

const icons: Array<{
  icon: typeof ClockIcon;
  foreground: string;
  background: string;
}> = [
  {
    icon: ClockIcon,
    foreground: "text-teal-700",
    background: "bg-teal-50",
  },
  {
    icon: CheckBadgeIcon,
    foreground: "text-purple-700",
    background: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    foreground: "text-sky-700",
    background: "bg-sky-50",
  },
  {
    icon: BanknotesIcon,
    foreground: "text-yellow-700",
    background: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    foreground: "text-rose-700",
    background: "bg-rose-50",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface IProps {
  items: GridListItem[];
}

const GridList: FC<IProps> = ({ items }) => {
  const firstIcon = icons[1];
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className={classNames(
            idx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
            idx === 1 ? "sm:rounded-tr-lg" : "",
            idx === items.length - 2 ? "sm:rounded-bl-lg" : "",
            idx === items.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          )}
        >
          <div>
            <span
              className={classNames(
                icons[idx % icons.length].foreground,
                icons[idx % icons.length].background,
                // item.iconBackground,
                // item.iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-white"
              )}
            >
              <BanknotesIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <a href={item.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {item.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-500">{item.description}</p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
};

export { GridList };
