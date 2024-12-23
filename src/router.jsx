import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/:id",
    element: <CategoryDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
],
{basename: window.APP_ID === undefined ? "/" : `/zapps/${window.APP_ID}`}
);
export default router;