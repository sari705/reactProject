import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { useDispatch } from 'react-redux'

import ProductList from './pages/ProductList'
import Cart from '../pages/Cart'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import ViewProduct from './components/ViewProduct'
import LogOut from './pages/LogOut'
import { userIn } from './features/userSlice';
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
      dispatch("..."(cart));
    }//צריך להוסיף את סל הקניות ללוקל סטורג'
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
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/logout" element={<LogOut />}/>
      </Routes>

    </>
  )
}

export default App
