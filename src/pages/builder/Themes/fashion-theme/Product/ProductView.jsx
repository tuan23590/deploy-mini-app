import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductById, getProducts } from "@/pages/builder/Themes/fashion-theme/utils/api";
import { formatPrice } from "@/pages/builder/Themes/fashion-theme/utils/format";
import ShareButton from "@/pages/builder/Themes/fashion-theme/components/ShareButton";
import VariantPicker from "@/pages/builder/Themes/fashion-theme/Product/VariantPicker";
import HorizontalDivider from "@/pages/builder/Themes/fashion-theme/components/HorizontalDivider";
import Button from "@/pages/builder/Themes/fashion-theme/components/Button";
import RelatedProducts from "@/pages/builder/Themes/fashion-theme/Product/RelatedProducts";
import Collapse from "@/pages/builder/Themes/fashion-theme/components/Collapse";

function ProductView({ store: { useStore } }) {
  const [storeLocal] = useStore();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productById = await getProductById(1);
      const products = await getProducts()
      setProduct(productById);
      setRelatedProducts(
        products.filter((p) => p.id !== productById.id)
      );
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    setSelectedColor(product?.colors?.[0]);
    setSelectedSize(product?.sizes?.[0]);
  }, [product]);

  const onAddToCart = () => {
    console.log("Add to cart", product);
  };

  const onBuyNow = () => {
    console.log("Buy now", product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col h-full bg-background">
      <WrapperScroll className="flex-1 overflow-y-auto">
        <div className="w-full px-4">
          <div className="py-2">
            <ImageProduct
              key={product.id}
              src={product.image}
              alt={product.name}
              product_id={product.id}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-xl font-medium text-primary">
            {formatPrice(product.price)}
          </div>
          {!!product.originalPrice && (
            <div className="text-2xs text-subtitle line-through">
              {formatPrice(product.price)}
            </div>
          )}
          <div className="text-sm mt-1">{product.name}</div>
          <div className="py-2">
            <ShareButton product={product} />
          </div>
          {product.colors && (
            <VariantPicker
              title="Color"
              variants={product.colors}
              value={selectedColor}
              onChange={(color) => {
                setSelectedColor(color);
              }}
              renderVariant={(variant, selected) => (
                <div
                  className={"w-full h-full rounded-full ".concat(
                    selected ? "border-2 border-primary p-0.5" : ""
                  )}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: variant?.hex }}
                  />
                </div>
              )}
            />
          )}
          <HorizontalDivider />
          {product.sizes && (
            <VariantPicker
              title="Size"
              variants={product.sizes}
              value={selectedSize}
              onChange={(size) => setSelectedSize(size)}
              renderVariant={(variant, selected) => (
                <div
                  className={"w-full h-full flex justify-center items-center ".concat(
                    selected ? "bg-primary text-white" : ""
                  )}
                >
                  <div className="text-base truncate">{variant}</div>
                </div>
              )}
            />
          )}
        </div>
        {product.details && (
          <>
            <div className="bg-section h-2 w-full"></div>
            <Collapse items={product.details} />
          </>
        )}
        <div className="bg-section h-2 w-full"></div>
        <div className="font-medium py-2 px-4">
          <div className="text-base pt-2 pb-2.5">Sản phẩm khác</div>
          <HorizontalDivider />
        </div>
        <RelatedProducts currentProductId={product.id} relatedProducts={relatedProducts} />
      </WrapperScroll>

      <HorizontalDivider />
      <div className="flex-none grid grid-cols-2 gap-2 py-3 px-4">
        <Button large onClick={onAddToCart}>
          Thêm vào giỏ
        </Button>
        <Button large primary onClick={onBuyNow}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}

const ImageProduct = styled.img`
  viewtransitionname: product-image-${(props) => props.product_id};
`;

const WrapperScroll = styled.div`
scroll-behavior: smooth;
scroll-snap-type: y mandatory;
scrollbar-width: thin;
`;

export default ProductView;
