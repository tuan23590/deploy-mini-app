
import Barcode from "@/pages/builder/Themes/fashion-theme/Points/Barcode";
import pointsCover from "@/pages/builder/Themes/fashion-theme/Points/points-cover.png";

function PointsView({ store: { useStore } }) {
  const [storeLocal] = useStore();

  return (
    <div
    className="rounded-lg bg-primary text-white p-8 pt-6 bg-cover text-center m-4"
    style={{
      backgroundImage: `url(${pointsCover})`,
    }}
  >
    <div className="text-xl font-medium opacity-95">20 điểm</div>
    <div className="opacity-95 text-2xs">HSD: 02/12/2024</div>
    <div className="bg-white rounded-lg mt-2 py-2.5 space-y-2.5 flex flex-col items-center">
      <div className="text-2xs text-subtitle text-center">
        Quét mã để tích điểm
      </div>
      <Barcode />
    </div>
  </div>
  );
}

export default PointsView;
