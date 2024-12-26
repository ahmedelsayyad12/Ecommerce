import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import WishList from "./components/WishList/WishList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishListContextProvider from "./Context/WishListContext";
import CheckOut from "./components/CheckOut/CheckOut";
import Orders from "./components/Orders/Orders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";

let query = new QueryClient();

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:categoryName",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "verifyCode", element: <VerifyCode /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={query}>
      <WishListContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster position="top-center" />
          </UserContextProvider>
        </CartContextProvider>
      </WishListContextProvider>
    </QueryClientProvider>
  );
}

export default App;
