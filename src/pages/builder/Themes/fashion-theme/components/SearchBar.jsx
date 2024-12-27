import { SearchIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import { forwardRef } from "react";

const SearchBar = forwardRef((props, ref) => {
  return (
    <div className="px-4">
      <div className="relative w-full">
        <input
          ref={ref}
          {...props}
          className="w-full h-12 pl-12 pr-3 bg-section text-lg rounded-lg outline-none placeholder:text-inactive"
        />
        <SearchIcon className="absolute top-3 left-3" />
      </div>
    </div>
  );
});

export default SearchBar;
