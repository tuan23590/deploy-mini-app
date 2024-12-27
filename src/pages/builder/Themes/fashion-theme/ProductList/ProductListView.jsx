import { useEffect, useState } from "react";
import ProductItem from "@/pages/builder/Themes/fashion-theme/components/ProductItem";
import { getProducts } from "@/pages/builder/Themes/fashion-theme/utils/api";

function ProductListView({ store: { useStore } }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const productsData =  await getProducts();
      setProducts(productsData);
    }
    fetchProducts();
  }, []);

  if (products.length === 0) { return <div>Loading...</div> }

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
