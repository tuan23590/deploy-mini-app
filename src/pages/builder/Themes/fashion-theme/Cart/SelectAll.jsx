import Checkbox from "@/pages/builder/Themes/fashion-theme/components/Checkbox";
import { RemoveIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";

export default function SelectAll({useStore}) {
  const [cart, setCart] = useStore.cart();
  const [selectedItemIds, setSelectedItemIds] = useStore.selectedItemIds();
  const checkedAll =
    selectedItemIds.length > 0 &&
    !cart.some((item) => !selectedItemIds.includes(item.id));
  const checkAll = () => {
    setSelectedItemIds(cart.map((item) => item.id));
  };
  const uncheckAll = () => {
    setSelectedItemIds([]);
  };

  const onRemove = () => {
    setCart(cart.filter((item) => !selectedItemIds.includes(item.id)));
    setSelectedItemIds([]);
  };
  return (
    <div className="px-4 py-3 flex items-center space-x-4">
      <Checkbox
        checked={checkedAll}
        onChange={checkedAll ? uncheckAll : checkAll}
      />
      <div className="text-sm font-medium flex-1">Tất cả</div>
      {selectedItemIds.length > 0 && (
        <RemoveIcon className="cursor-pointer" onClick={onRemove} />
      )}
    </div>
  );
}
