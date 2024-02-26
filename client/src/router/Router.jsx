import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home/Home";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import ProductDetails from "../pages/Product/ProductDetails.jsx";
import PrivateRouter from "../pages/PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <MainLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(
            `https://product-management-system-sgdt.onrender.com/${params.id}`
          ),
      },
    ],
  },
  //Signup page will no have header and footr so it wont have childs
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
