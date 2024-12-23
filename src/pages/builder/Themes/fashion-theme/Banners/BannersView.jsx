import Carousel from "@/pages/builder/Themes/fashion-theme/components/Carousel";

function SearchBarAndBannersView({ store: { useStore } }) {
  const [banners, setBanners] = useStore.banners();
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
