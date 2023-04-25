import "./app.scss";
import {
  createBrowserRouter, RouterProvider,
  Outlet, Navigate
} from "react-router-dom";
import Footer from "./common/footer/Footer";
import Navbar from "./common/navbar/Navbar";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ForgotPassword from './pages/ password/forgotPassword/ForgotPassword';
import ResetPassword from './pages/ password/resetPassword/ResetPassword';
import Error from "./pages/error/Error";
import Success from "./pages/success/Success";
import Cancel from "./pages/cancel/Cancel";
// import { useSelector } from "react-redux";

const Layout = () => {
  // const { currentUser } = useSelector(state => state.user);

  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotpassword/:id/:token",
        element: <ForgotPassword />,
      },
      {
        path: "/password-reset",
        element: <ResetPassword />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;