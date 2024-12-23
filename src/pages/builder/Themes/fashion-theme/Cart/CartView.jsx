import { EmptyBoxIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import SelectAll from "@/pages/builder/Themes/fashion-theme/Cart/SelectAll";
import HorizontalDivider from "@/pages/builder/Themes/fashion-theme/components/HorizontalDivider";
import CartList from "@/pages/builder/Themes/fashion-theme/Cart/CartList";
import ApplyVoucher from "@/pages/builder/Themes/fashion-theme/Cart/ApplyVoucher";
import CartSummary from "@/pages/builder/Themes/fashion-theme/Cart/CartSummary";
import { useEffect } from "react";
function CartView({ store: { useStore } }) {
  const [storeLocal] = useStore();
  const { cart } = storeLocal;
  const [selectedItemIds, setSelectedItemIds] = useStore.selectedItemIds();
  const [totalItems, setTotalItems] = useStore.totalItems();
  const [totalAmount, setTotalAmount] = useStore.totalAmount();

  useEffect(() => {
    const listSelectedItems = cart.filter((item) => selectedItemIds.includes(item.id));
    const totalItems = listSelectedItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = listSelectedItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    setTotalItems(totalItems);
    setTotalAmount(totalAmount);
  }, [selectedItemIds,cart]);



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
      <SelectAll useStore={useStore} />
      <HorizontalDivider />
      <CartList cart={cart} useStore={useStore} />
      <HorizontalDivider />
      <ApplyVoucher />
      <HorizontalDivider />
      <CartSummary useStore={useStore}/>
    </div>
  );
}

export default CartView;
