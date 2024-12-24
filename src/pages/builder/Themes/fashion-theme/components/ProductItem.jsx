import { formatPrice } from "@/pages/builder/Themes/fashion-theme/utils/format";
import TransitionLink from "@/pages/builder/Themes/fashion-theme/components/TransitionLink";

export default function ProductItem(props) {
  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group"
      to={`/product/${props.product.id}`}
    >
      <img
        className="w-full aspect-square object-cover rounded-t-lg"
        src={props.product.image}
        alt={props.product?.name}
        product_id={props.product.id}
      />
      <div className="py-2">
        <div className="text-3xs text-subtitle truncate">
          {props.product.category?.name}
        </div>
        <div className="text-xs h-9 line-clamp-2">{props.product.name}</div>
        <div className="mt-0.5 text-sm font-medium">
          {formatPrice(props.product.price)}
        </div>
        <div className="text-3xs text-subtitle line-through">
          {formatPrice(props.product.price)}
        </div>
      </div>
    </TransitionLink>
  );
}
