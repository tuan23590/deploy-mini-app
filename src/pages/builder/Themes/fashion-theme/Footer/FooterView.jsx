import styled from "styled-components";
import HorizontalDivider from "@/pages/builder/Themes/fashion-theme/components/HorizontalDivider";
import TransitionLink from "@/pages/builder/Themes/fashion-theme/components/TransitionLink";
import { CartIcon, CategoryIcon, HomeIcon, ProfileIcon } from "@/pages/builder/Themes/fashion-theme/components/Vectors";

const NAV_ITEMS = [
  {
    name: "home-tab",
    displayName: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "categories-tab",
    displayName: "Danh mục",
    path: "/categories",
    icon: CategoryIcon,
  },
  {
    name: "cart-tab",
    displayName: "Giỏ hàng",
    path: "/cart",
    icon: (props) => {
      // const [cart, _] = useCartStore.cart();
      const cart = ["1", "2", "3"];
      return (
        <div className="relative">
          {cart.length > 0 && (
            <div className="absolute top-0 left-[18px] h-4 px-1.5 pt-[1.5px] pb-[0.5px] rounded-full bg-[#FF3333] text-white text-[10px] leading-[14px] font-medium shadow-[0_0_0_2px_white]">
            {cart.length > 9 ? "9+" : cart.length}
          </div>
          )}
          <CartIcon {...props} />
        </div>
      );
    },
  },
  {
    name: "profile-tab",
    displayName: "Thành viên",
    path: "/profile",
    icon: ProfileIcon,
  },
];

function FooterView({store: { useStore } }) {
  const [storeLocal] = useStore();

  return (
    <div className="footer bg-background">
    <HorizontalDivider />
    <ListFooter
      className="w-full px-4 pt-2 grid"
      itemLength={NAV_ITEMS.length}
    >
      {NAV_ITEMS.map((item) => {
        return (
          <TransitionLink
            to={item.path}
            key={item.path}
            className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
          >
           {({ isActive }) => (
                <>
                  <div className="w-6 h-6 flex justify-center items-center">
                    <item.icon active={isActive} />
                  </div>
                  <div className={`text-2xs ${isActive ? "text-primary" : ""}`}>
                    {item.displayName}
                  </div>
                </>
              )}
          </TransitionLink>
        );
      })}
    </ListFooter>
  </div>
  );
}

const ListFooter = styled.div`
  grid-template-columns: ${(props) => `repeat(${props.itemLength}, 1fr)`};
  padding-bottom: ${(props) => `max(16px, env(safe-area-inset-bottom))`};
`;

export default FooterView;
