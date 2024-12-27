import { useEffect, useState } from "react";
import { getProducts } from "@/pages/builder/Themes/fashion-theme/utils/api";
import Section from "@/pages/builder/Themes/fashion-theme/components/Section";
import ProductGrid from "@/pages/builder/Themes/fashion-theme/components/ProductGrid";

function FlashSalesView({ store: { useStore } }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData =  await getProducts();
      setProducts(productsData);
    }
    fetchProducts();
  }, []);

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <Section title="Flash Sales" 
    // viewMoreTo="/flash-sales"
    >
      <ProductGrid products={products} />
    </Section>
  );
}

export default FlashSalesView;
