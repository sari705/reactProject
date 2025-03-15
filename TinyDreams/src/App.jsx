import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";import { useDispatch } from 'react-redux'
import UpdateProduct from './pages/UpdateProduct'
import ProtectRoute from './components/ProtectRoute'
import ProductList from './pages/ProductList'
import ViewProduct from './components/ViewProduct'
import AddProduct from './pages/AddProduct'
import Profile from "./components/Profile"
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Home from './pages/Home'
import LogOut from './pages/LogOut'
import OrderCompletion from './pages/LogOut'
import { userIn } from './features/userSlice';
import './App.css'
import UserOrders from "./pages/UserOrders"
import CheckOut from "./pages/CheckOut"
import Orders from "./pages/Orders"
import Users from "./pages/Users"
import Checkout from "./pages/MuiCheckOut"


function App() {

  const theme = createTheme({
    typography: {
      fontFamily: "'Fredoka', sans-serif",
      fontWeightBold: "380",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    if (user) {
      user = JSON.parse(user);
      dispatch(userIn(user));
    }

    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      dispatch("..."(cart));
    }//צריך להוסיף את סל הקניות ללוקל סטורג'
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* מוודא שכל הסטיילים הבסיסיים מוחלים */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/products" element={<ProductList />}>
            <Route path="details/:id" element={<ViewProduct></ViewProduct>}>
            </Route>
          </Route>
          <Route path="/cart" element={<Cart />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-product" element={<ProtectRoute role="MANAGER"><AddProduct /></ProtectRoute>} />
          <Route path="/update-product" element={<ProtectRoute role="MANAGER">
            <UpdateProduct />
          </ProtectRoute>} />
        <Route path="/profile" element={<ProtectRoute role="USER"><Profile /></ProtectRoute>} />
        <Route path="/checkout" element={<ProtectRoute role="USER"><Checkout/></ProtectRoute>}/>
        {/* {
      לבדוק את סיום ההזמנה בלי פרוטקטרוט
        } */}

        <Route path="/userorders" element={<ProtectRoute role="USER"><UserOrders/></ProtectRoute>}></Route>



          <Route path="/profile" element={<ProtectRoute role="USER"><Profile /></ProtectRoute>} />
          <Route path="/checkout" element={<ProtectRoute role="USER"><OrderCompletion /></ProtectRoute>} />
          <Route path="/orders" element={<ProtectRoute role="MANAGER"><Orders /></ProtectRoute>} />
          <Route path="/users" element={<ProtectRoute role="MANAGER"><Users /></ProtectRoute>} />
          {/* {
      לבדוק את סיום ההזמנה בלי פרוטקטרוט
        } */}

          <Route path="/userorders" element={<UserOrders />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
