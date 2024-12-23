import styled from "styled-components";
import CartItem from "@/pages/builder/Themes/fashion-theme/Cart/CartItem";

export default function CartList({cart,useStore}) {
  return (
    <WrapperScroll className="flex-1 overflow-y-auto">
      {cart.map((item) => (
        <CartItem key={item.id} useStore={useStore} item={item}/>
      ))}
    </WrapperScroll>
  )
}

const WrapperScroll = styled.div`
scroll-behavior: smooth;
scroll-snap-type: y mandatory;
scrollbar-width: thin;
`;