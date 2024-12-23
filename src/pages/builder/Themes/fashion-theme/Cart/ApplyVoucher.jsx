import { ChevronRight, VoucherIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";

export default function ApplyVoucher() {
  const toBeImplemented = () => {
    alert("This feature is not implemented yet");
  };
  return (
    <div
      className="flex-none flex items-center py-2 px-4 space-x-2 cursor-pointer"
      onClick={toBeImplemented}
    >
      <VoucherIcon />
      <div className="text-sm flex-1">Voucher</div>
      <div className="flex items-center space-x-1">
        <div className="text-sm font-medium">Chọn</div>
        <ChevronRight />
      </div>
    </div>
  );
}
