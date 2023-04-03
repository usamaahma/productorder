import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/crudwithapi/login";
import Orders from "./components/crudwithapi/orders";
import Products from "./components/crudwithapi/products";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
]);

export const privateRoutes = createBrowserRouter([
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "*",
    element: <Navigate replace to="/products" />,
  },
]);

function Router() {
  const { loggedIn } = useSelector((state) => state.user);
  const router = loggedIn ? privateRoutes : publicRoutes;
  return <RouterProvider router={router} />;
}
export default Router;
