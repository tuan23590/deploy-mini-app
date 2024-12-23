import Section from "@/pages/builder/Themes/fashion-theme/components/Section";
import TransitionLink from "@/pages/builder/Themes/fashion-theme/components/TransitionLink";
import styled from "styled-components";

function CategoryListView({ store: { useStore } }) {
  const [storeLocal, setStoreLocal] = useStore();
  const { categories } = storeLocal;

  if (!categories) return <div>Loading...</div>;

  return (
    <div className="bg-background">
    <Section title="Danh mục sản phẩm" viewMoreTo="/categories">
      <WrapperScroll className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4">
        {categories.map((category) => (
          <TransitionLink
            key={category.id}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer"
            // to={`/category/${category.id}`}
          >
            <img
              src={category.image}
              className="w-[70px] h-[70px] object-cover rounded-full border-[0.5px] border-black/15"
              alt={category.name}
            />
            <div className="text-center text-sm w-full line-clamp-2 text-subtitle">
              {category.name}
            </div>
          </TransitionLink>
        ))}
      </WrapperScroll>
    </Section>
    </div>
  );
}

export default CategoryListView;


const WrapperScroll = styled.div`
scroll-behavior: smooth;
scroll-snap-type: X mandatory;
scrollbar-width: thin;
`;