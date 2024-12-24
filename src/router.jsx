import { createBrowserRouter } from "react-router-dom";
import Render from "@/pages/Render";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Render pageSelected={"home-tab"} pageTitle={"Trang chủ"} />,
  },
  {
    path: "/categories",
    element: <Render pageSelected={"categories-tab"} pageTitle={"Danh mục"} />,
  },
  {
    path: "/category/:id",
    element: <Render pageSelected={"category-detail-tab"} pageTitle={"Chi tiết danh mục"} />,
    loader: ({params}) => {
      // load dữ liệu danh mục theo id
      return params.id;
    },
  },
  {
    path: "/cart",
    element: <Render pageSelected={"cart-tab"} pageTitle={"Giỏ hàng"} />,
  },
  {
    path: "/product/:id",
    element: <Render pageSelected={"product-detail-tab"} pageTitle={"Chi tiết sản phẩm"} />,
    handle: {
      scrollRestoration: 0,
    },
    loader: ({params}) => {
      // load dữ liệu sản phẩm theo id
      return params.id;
    },
  },
  {
    path: "/profile",
    element: <Render pageSelected={"profile-tab"} pageTitle={"Hồ sơ"} />,
  }
],
{basename: window.APP_ID === undefined ? "/" : `/zapps/${window.APP_ID}`}
);
export default router;