import { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai"

interface IProps {
  onChange: (value: string) => void;
}

const SearchBar: FC<IProps> = ({ onChange }) => {
  return (
    <div className="relative flex w-full mb-4 h-10">
      <div className="absolute top-0 left-2 flex items-center h-full">
        <AiOutlineSearch className="w-6 h-auto text-gray-600" />
      </div>
      <input
        type="text"
        className="pl-8 pr-2 flex-1 block border-2 border-gray-300 rounded-md"
        onChange={e => {
          onChange(e.target.value)
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
