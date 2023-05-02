import { FC } from "react";

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<IProps> = ({ onChange }) => {
  return (
    <div className="flex w-full space-x-3 mb-4">
      <input
        type="text"
        className="px-2 flex-1 block border-2 border-gray-300 rounded-md"
        onChange={onChange}
      />
      <button className="flex-shrink-0 px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
