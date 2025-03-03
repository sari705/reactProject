import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import { Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'


function App() {

  return (
    <>   
      <NavBar/>

      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct/>} />
      </Routes>

    </>
  )
}

export default App
