import Button from "@/pages/builder/Themes/fashion-theme/components/Button";
import { CustomerSupportIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import { formatPrice } from "@/pages/builder/Themes/fashion-theme/utils/format";
import { produce } from "immer";

export default function CartSummary({
  totalItems,
  totalAmount,
  selectedItemIds,
  setCart,
  setSelectedItemIds,
}) {
  const contact = () => {
    alert("This feature is not implemented yet");
    };
  const checkout = () => {
    // delete selected items from cart
    setCart(
        produce((draft) => {
          return draft.filter((i) => !selectedItemIds.includes(i.id));
        })
    );
    setSelectedItemIds([]);
    alert("Payment successful");
  };

  return (
    <div className="flex-none flex items-center py-3 px-4 space-x-2">
      <div className="space-y-1 flex-1">
        <div className="text-2xs text-subtitle">Tổng cộng ({totalItems})</div>
        <div className="text-sm font-medium text-primary">
          {formatPrice(totalAmount)}
        </div>
      </div>
      <Button className="w-10 h-10 !p-2" onClick={contact}>
        <CustomerSupportIcon />
      </Button>
      <Button primary onClick={checkout} disabled={totalItems === 0}>
        Mua ngay
      </Button>
    </div>
  );
}
