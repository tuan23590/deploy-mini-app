import { EmptyBoxIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import SelectAll from "@/pages/builder/Themes/fashion-theme/Cart/SelectAll";
import HorizontalDivider from "@/pages/builder/Themes/fashion-theme/components/HorizontalDivider";
import CartList from "@/pages/builder/Themes/fashion-theme/Cart/CartList";
import ApplyVoucher from "@/pages/builder/Themes/fashion-theme/Cart/ApplyVoucher";
import CartSummary from "@/pages/builder/Themes/fashion-theme/Cart/CartSummary";
import { useEffect, useState } from "react";
import { getCart } from "@/pages/builder/Themes/fashion-theme/utils/api";
function CartView({ store: { useStore } }) {
  const [cart, setCart] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setCart(data);
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const listSelectedItems = cart.filter((item) =>
      selectedItemIds.includes(item.id)
    );
    const totalItems = listSelectedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalAmount = listSelectedItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setTotalItems(totalItems);
    setTotalAmount(totalAmount);
  }, [selectedItemIds, cart]);

  if (!cart?.length) {
    return (
      <div
        className="w-full h-full
       flex flex-col items-center justify-center space-y-8 bg-background"
      >
        <EmptyBoxIcon />
        <div className="text-2xs text-inactive text-center">
          Không có sản phẩm trong giỏ hàng
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background w-full h-full flex flex-col gap-1">
      <SelectAll
        cart={cart}
        setCart={setCart}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
      />
      <HorizontalDivider />
      <CartList
        cart={cart}
        setCart={setCart}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
      />
      <HorizontalDivider />
      <ApplyVoucher />
      <HorizontalDivider />
      <CartSummary
        totalItems={totalItems}
        totalAmount={totalAmount}
        selectedItemIds={selectedItemIds}
        setCart={setCart}
        setSelectedItemIds={setSelectedItemIds}
      />
    </div>
  );
}

export default CartView;
