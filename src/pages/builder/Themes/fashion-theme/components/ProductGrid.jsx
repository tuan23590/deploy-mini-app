import ProductItem from "@/pages/builder/Themes/fashion-theme/components/ProductItem";

export default function ProductGrid({
  products,
  className,
  replace,
  ...props
}) {
  return (
    <div
      className={"grid grid-cols-2 px-4 py-2 gap-4 ".concat(className ?? "")}
      {...props}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} replace={replace} />
      ))}
    </div>
  );
}
