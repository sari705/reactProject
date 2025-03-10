<<<<<<< HEAD
import { Routes, Route} from "react-router-dom"
=======
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { useDispatch } from 'react-redux'

import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import AddProduct from './pages/AddProduct'
>>>>>>> 90dcaa36d4e28916d6cc614a524d266cb5b4d10a
import UpdateProduct from './pages/UpdateProduct'
import ProtectRoute from './components/ProtectRoute'
import ProductList from './pages/ProductList'
import ViewProduct from './components/ViewProduct'
<<<<<<< HEAD
import AddProduct from './pages/AddProduct'
import Profile from "./components/Profile"
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Home from './pages/Home'
=======
import LogOut from './pages/LogOut'
import { userIn } from './features/userSlice';
>>>>>>> 90dcaa36d4e28916d6cc614a524d266cb5b4d10a
import './App.css'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem("currentUser");
    if (user) {
      user = JSON.parse(user);
      dispatch(userIn(user));
    }
    let cart = localStorage.getItem("cart");
    if(cart) {
      cart = JSON.parse(cart);
      dispatch((cart));
    }
  }, [])

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductList />}>
          <Route path="details/:id" element={<ViewProduct></ViewProduct>}>
          </Route>
        </Route>
        <Route path="/cart" element={<Cart />} />

        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/add-product" element={<ProtectRoute role="MANAGER"><AddProduct /></ProtectRoute>} />
        <Route path="/profile" element={<ProtectRoute role="USER"><Profile /></ProtectRoute>} />
        <Route path="/update-product" element={<ProtectRoute role="MANAGER">
          <UpdateProduct/>
          </ProtectRoute>} />
=======
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/logout" element={<LogOut />}/>
>>>>>>> 90dcaa36d4e28916d6cc614a524d266cb5b4d10a
      </Routes>

    </>
  )
}

export default App
