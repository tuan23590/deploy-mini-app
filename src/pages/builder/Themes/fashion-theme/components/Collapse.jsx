import { MinusIcon, PlusIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";
import HorizontalDivider from "@/pages/builder/Themes/fashion-theme/components/HorizontalDivider";
import { useEffect, useRef, useState } from "react";
import { useSpringValue, animated } from "@react-spring/web";
import { Fragment } from "react";
import { useRealHeight } from "@/pages/builder/Themes/fashion-theme/utils/hook";

function CollapseItem(props) {
  const [collapsed, setCollapsed] = useState(true);
  const container = useRef(null);
  const containerHeight = useRealHeight(container);
  const height = useSpringValue(0);

  useEffect(() => {
    height.start(collapsed ? 0 : 1);
  }, [collapsed]);

  return (
    <>
      <div
        className="py-3 flex justify-between items-center space-x-4 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="text-base font-medium">{props.title}</div>
        {collapsed ? <PlusIcon /> : <MinusIcon />}
      </div>
      <animated.div
        className="text-sm whitespace-pre-wrap text-subtitle overflow-hidden ease-in-out"
        style={{
          maxHeight: height.to((x) => x * containerHeight),
        }}
      >
        <div ref={container}>
          <div className="pb-3">{props.content}</div>
        </div>
      </animated.div>
    </>
  );
}

export default function Collapse(props) {
  return (
    <div className="px-4 py-1">
      {props.items.map((item, index) => (
        <Fragment key={"fragment-" + index}>
          <CollapseItem key={"collapse-item-" + index} {...item} />
          {index < props.items.length - 1 && <HorizontalDivider />}
        </Fragment>
      ))}
    </div>
  );
}
