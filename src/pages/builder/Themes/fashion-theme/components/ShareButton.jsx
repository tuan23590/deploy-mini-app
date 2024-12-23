import { openShareSheet } from "zmp-sdk";
import { ChevronRight, ShareDecor } from "@/pages/builder/Themes/fashion-theme/components/Vectors";

export default function ShareButton(props) {
  const onShare = () => {
    openShareSheet({
      type: "zmp_deep_link",
      data: {
        title: props.product.name,
        thumbnail: props.product.image,
        path: `/product/${props.product.id}`,
      },
    });
  };

  return (
    <button
      className="relative p-4 w-full flex space-x-1 bg-[#016BD9] rounded-lg text-white text-sm font-medium cursor-pointer"
      onClick={onShare}
    >
      <div>Chia sẻ ngay cho bạn bè</div>
      <ChevronRight />
      <div className="absolute right-5 top-[11px]">
        <ShareDecor />
      </div>
    </button>
  );
}
