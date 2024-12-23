import SearchBar from "@/pages/builder/Themes/fashion-theme/components/SearchBar";

function SearchBarView({ store: { useStore } }) {
  const [storeLocal] = useStore();

  return (
    <div className="bg-background pt-2">
      <SearchBar 
      placeholder={storeLocal.placeholder}
      />
    </div>
  );
}

export default SearchBarView;
