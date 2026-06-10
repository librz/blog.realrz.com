"use client";

import { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface IProps {
  onChange: (value: string) => void;
}

const SearchBar: FC<IProps> = ({ onChange }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <AiOutlineSearch className="w-4 h-4 text-stone-400" />
      </div>
      <input
        type="text"
        className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Search articles..."
      />
    </div>
  );
};

export default SearchBar;
