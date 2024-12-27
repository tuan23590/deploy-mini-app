import { Suspense, useEffect, useState } from "react";
import Select from "@/pages/builder/Themes/fashion-theme/components/Select";
import styled from "styled-components";
import HorizontalDivider from "@/pages/builder/Themes/fashion-theme/components/HorizontalDivider";
import { getColorOptions, getSizeOptions } from "@/pages/builder/Themes/fashion-theme/utils/api";

function ProductFilterView({ store: { useStore } }) {
  const [initSizes, setInitSizes] = useState([]);
  const [size, setSize] = useState("");
  const [initColors, setInitColors] = useState([]);
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchSizesAndColors = async () => {
      const sizes = await getSizeOptions();
      setInitSizes(sizes);
      const colors = await getColorOptions();
      setInitColors(colors);
    };
    fetchSizesAndColors();
  } ,[]);

  return (
    <>
    <WrapperScroll className="flex px-4 py-3 space-x-2 overflow-x-auto bg-background">
      <Suspense
        fallback={
          // <SelectSkeleton width={110} />
          <div>
            loading...
          </div>
        }
      >
        <Select
          items={initSizes}
          value={size}
          onChange={setSize}
          renderTitle={(selectedSize) =>
            `Kích thước${selectedSize ? `: ${selectedSize}` : ""}`
          }
          renderItemKey={(size) => String(size)}
        />
      </Suspense>
      <Suspense fallback={
        // <SelectSkeleton width={95} />
        <div>
          loading...
        </div>
      }>
        <Select
          items={initColors}
          value={color}
          onChange={setColor}
          renderTitle={(selectedColor) =>
            `Màu sắc${selectedColor ? `: ${selectedColor.name}` : ""}`
          }
          renderItemLabel={(color) => color.name}
          renderItemKey={(color) => color.name}
        />
      </Suspense>
      {(color !== "" || size !== "") && (
        <button
          className="bg-primary text-white rounded-full h-8 flex-none px-3"
          onClick={() => {
            setColor("");
            setSize("");
          }}
        >
          Xoá bộ lọc
        </button>
      )}
    </WrapperScroll>
    <HorizontalDivider />
    </>
  );
}

export default ProductFilterView;

const WrapperScroll = styled.div`
scroll-behavior: smooth;
scroll-snap-type: x mandatory;
scrollbar-width: thin;
`;