import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Login from './pages/Login'


function App() {

  return (
    <>
    <Login></Login>
    <ProductList></ProductList>
    <Cart></Cart>
    
      </>
  )
}

export default App
