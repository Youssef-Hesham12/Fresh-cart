import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Register from './component/Authentication/Register/Register'
import Login from './component/Authentication/Login/Login'
import Products from './component/Products/Products'
import Cart from './component/Cart/Cart'
import Brands from './component/Brands/Brands'
import Notfound from './component/Notfound/Notfound'
import Categories from './component/Categories/Categories'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './component/protectedRoute/protectedRoute'
import ProductDetails from './component/ProductDetails/ProductDetails'
import  { Toaster } from 'react-hot-toast';
import ForgetPassword from './component/Authentication/ForgetPassword/ForgetPassword'
import VerifyCode from './component/Authentication/VerifyCode/VerifyCode'
import UpdatePassword from './component/Authentication/UpdatePassword/UpdatePassword'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import WishList from './component/WishList/WishList'
import CheckOut from './component/CheckOut/CheckOut'
import AllOrders from './component/AllOrders/AllOrders'
const query = new QueryClient()
let router = createBrowserRouter(
  [
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute> <WishList /></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute> <CheckOut /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute> <AllOrders /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "updatePassword", element: <UpdatePassword /> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ]
)

function App() {
  return <CartContextProvider>
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
        <ReactQueryDevtools />
      </UserContextProvider>
    </QueryClientProvider>
  </CartContextProvider>
}

export default App
