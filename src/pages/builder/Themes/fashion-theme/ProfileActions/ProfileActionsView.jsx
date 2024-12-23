
import {
  OrderHistoryIcon,
  PackageIcon,
  ProfileIcon,
  VoucherIcon,
} from "@/pages/builder/Themes/fashion-theme/components/Vectors";

function ProfileActionsView({ store: { useStore } }) {
  const [storeLocal] = useStore();
  const toBeImplemented = () => {
    alert("Chức năng đang được phát triển");
  }
  return (
    <div className="bg-white rounded-lg p-4 grid grid-cols-4 gap-4 border-[0.5px] border-black/15 mx-4">
      {[
        {
          label: "Thông tin tài khoản",
          icon: ProfileIcon,
          onClick: toBeImplemented,
        },
        {
          label: "Đổi voucher",
          icon: VoucherIcon,
          onClick: toBeImplemented,
        },
        {
          label: "Theo dõi đơn hàng",
          icon: PackageIcon,
          onClick: toBeImplemented,
        },
        {
          label: "Lịch sử mua hàng",
          icon: OrderHistoryIcon,
          onClick: toBeImplemented,
        },
      ].map((action) => (
        <div
          key={action.label}
          className="flex flex-col gap-2 items-center cursor-pointer"
          onClick={action.onClick}
        >
          <div className="w-10 h-10 rounded-full bg-[#EBEFF7] flex items-center justify-center">
            <action.icon active />
          </div>
          <div className="text text-center">{action.label}</div>
        </div>
      ))}
    </div>
  );
}


export default ProfileActionsView;
