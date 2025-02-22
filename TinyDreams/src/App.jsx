import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './pages/ProductList'

function App() {

  const [choiseProduct, setChoiseProduct] = useState();

  return (
    <>
    <ProductList setChoiseProduct={setChoiseProduct}></ProductList>
      </>
  )
}

export default App
