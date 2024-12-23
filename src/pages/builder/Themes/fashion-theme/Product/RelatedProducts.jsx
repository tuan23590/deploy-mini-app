import { useMemo } from "react";
import ProductGrid from "@/pages/builder/Themes/fashion-theme/components/ProductGrid";

export default function RelatedProducts({currentProductId,useStore}) {
  const [relatedProducts,_] = useStore.relatedProducts();
  const otherProducts = useMemo(
    () => relatedProducts.filter((product) => product.id !== currentProductId),
    [relatedProducts, currentProductId]
  );

  return <ProductGrid replace products={otherProducts} />;
}
