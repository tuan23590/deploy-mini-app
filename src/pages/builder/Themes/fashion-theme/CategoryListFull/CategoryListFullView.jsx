import TransitionLink from "@/pages/builder/Themes/fashion-theme/components/TransitionLink";
import { getCategories } from "@/pages/builder/Themes/fashion-theme/utils/api";
import { useEffect, useState } from "react";

function CategoryListFullView({ store: { useStore } }) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndTabs = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategoriesAndTabs();
  }, []);

  if (!categories) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 p-4 gap-x-4 gap-y-8 bg-background">
      {categories.map((category) => (
        <TransitionLink
          key={category.id}
          className="flex flex-col items-center space-y-2 overflow-hidden cursor-pointer"
          to={`/category/${category.id}`}
        >
          <img
            src={category.image}
            className="aspect-square object-cover rounded-full border-[0.5px] border-black/15"
            alt={category.name}
          />
          <div className="text-center text-sm w-full line-clamp-2 text-subtitle">
            {category.name}
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}

export default CategoryListFullView;
