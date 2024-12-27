import Carousel from "@/pages/builder/Themes/fashion-theme/components/Carousel";
import { useEffect, useState } from "react";
import { getBanners } from "@/pages/builder/Themes/fashion-theme/utils/api";

function SearchBarAndBannersView({ store: { useStore } }) {
  const [banners, setBanners] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      const bannerData = await getBanners();
      setBanners(bannerData);
    };
    fetchBanners();
  }, []);

  if (!banners) return <div>Loading...</div>;

  return (
    <div className="bg-background">
      <Carousel
        slides={banners.map((image, i) => (
          <img
            key={"image_" + i}
            src={image}
            alt={"image_" + i}
            className="w-max boder rounded"
          />
        ))}
      />
    </div>
  );
}

export default SearchBarAndBannersView;
