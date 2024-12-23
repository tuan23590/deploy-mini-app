import Section from "@/pages/builder/Themes/fashion-theme/components/Section";
import ProductGrid from "@/pages/builder/Themes/fashion-theme/components/ProductGrid";

function FlashSalesView({ store: { useStore } }) {
  const [storeLocal, setStoreLocal] = useStore();

  if (!storeLocal.products) return <div>Loading...</div>;

  return (
    <Section title="Flash Sales" 
    // viewMoreTo="/flash-sales"
    >
      <ProductGrid products={storeLocal.products} />
    </Section>
  );
}

export default FlashSalesView;
