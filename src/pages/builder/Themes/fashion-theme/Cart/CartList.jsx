import styled from "styled-components";
import CartItem from "@/pages/builder/Themes/fashion-theme/Cart/CartItem";

export default function CartList({
  cart,
  setCart,
  selectedItemIds,
  setSelectedItemIds,
}) {
  return (
    <WrapperScroll className="flex-1 overflow-y-auto">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          setCart={setCart}
          selectedItemIds={selectedItemIds}
          setSelectedItemIds={setSelectedItemIds}
        />
      ))}
    </WrapperScroll>
  );
}

const WrapperScroll = styled.div`
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scrollbar-width: thin;
`;
