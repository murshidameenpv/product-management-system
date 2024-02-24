import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../pages/Home/Home";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import ProductDetails from "../pages/Product/ProductDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-details",
        element:<ProductDetails/>
      }
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
