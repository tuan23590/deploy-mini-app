import { useEffect, useMemo, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { RemoveIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import Checkbox from "@/pages/builder/Themes/fashion-theme/components/Checkbox";
import QuantityInput from "@/pages/builder/Themes/fashion-theme/components/QuantityInput";
import { formatPrice } from "@/pages/builder/Themes/fashion-theme/utils/format";
import { produce } from "immer";

const SWIPE_TO_DELTE_OFFSET = 80;

export default function CartItem({ item, useStore }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [cart, setCart] = useStore.cart();
  const addToCart = (quantity) => {
    if (quantity === 0) {
      setCart(
        produce((draft) => {
          return draft.filter((i) => i.id !== item.id);
        })
      );
    } else {
      setCart(
        produce((draft) => {
          const index = draft.findIndex((i) => i.id === item.id);
          if (index === -1) {
            draft.push({ ...item, quantity });
          } else {
            draft[index].quantity = quantity;
          }
        })
      );
    }
  };

  const [selectedItemIds, setSelectedItemIds] = useStore.selectedItemIds();

  const displayOptions = useMemo(
    () =>
      Object.entries({
        Size: item.options.size,
        Color: item.options.color,
      })
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | "),
    [item.options]
  );

  useEffect(() => {
    addToCart(quantity);
  }, [quantity]);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(
    ({ last, offset: [ox] }) => {
      if (last) {
        if (ox < -SWIPE_TO_DELTE_OFFSET) {
          api.start({ x: -SWIPE_TO_DELTE_OFFSET });
        } else {
          api.start({ x: 0 });
        }
      } else {
        api.start({ x: Math.min(ox, 0), immediate: true });
      }
    },
    {
      from: () => [x.get(), 0],
      axis: "x",
      bounds: { left: -100, right: 0, top: 0, bottom: 0 },
      rubberband: true,
      preventScroll: true,
    }
  );

  const onCheckBoxChange = (checked) => {
    if (checked) {
      setSelectedItemIds([...selectedItemIds, item.id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== item.id));
    }
  };

  const onQuantityInputChange = (value) => {
    if (value <= 0) {
      setQuantity(1);
      api.start({ x: -SWIPE_TO_DELTE_OFFSET });
    } else {
      setQuantity(value);
      if (value > quantity) {
        api.start({ x: 0 });
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 bottom-0 w-20 border-t-[0.5px] border-b-[0.5px] border-black/10">
        <div
          className="bg-danger text-white/95 w-full h-full flex flex-col space-y-1 justify-center items-center cursor-pointer"
          onClick={() => addToCart(0)}
        >
          <RemoveIcon />
          <div className="text-2xs font-medium">Xoá</div>
        </div>
      </div>

      <animated.div
        {...bind()}
        style={{ x }}
        className="bg-white pl-4 flex items-center space-x-4 relative"
      >
        <Checkbox
          checked={selectedItemIds.includes(item.id)}
          onChange={onCheckBoxChange}
        />
        <img src={item.product.image} className="w-14 h-14 rounded-lg" />
        <div className="py-4 pr-4 flex-1 border-b-[0.5px] border-black/10">
          <div className="text-sm">{item.product.name}</div>
          {displayOptions && (
            <div className="text-xs text-subtitle mt-0.5">{displayOptions}</div>
          )}
          <div className="flex items-center py-2 space-x-2">
            <div className="flex-1 flex flex-wrap items-center space-x-0.5">
              <div className="text-xs font-medium text-primary">
                {formatPrice(item.product.price)}
              </div>
              {item.product.originalPrice && (
                <div className="line-through text-subtitle text-3xs">
                  {formatPrice(item.product.originalPrice)}
                </div>
              )}
            </div>
            <QuantityInput value={quantity} onChange={onQuantityInputChange} />
          </div>
        </div>
      </animated.div>
    </div>
  );
}
