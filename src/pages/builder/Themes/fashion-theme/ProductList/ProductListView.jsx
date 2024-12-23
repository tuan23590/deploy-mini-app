import { useEffect } from "react";
import ProductItem from "@/pages/builder/Themes/fashion-theme/components/ProductItem";

function ProductListView({ store: { useStore } }) {
  const [products, setProducts] = useStore.products();

  if (!products) return <div>Loading...</div>;

  return (
    <div
      className={"grid grid-cols-2 px-4 py-2 gap-4 pt-4 pb-[13px]"}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}


export default ProductListView;
