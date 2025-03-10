import { Routes, Route} from "react-router-dom"
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
import './App.css'


function App() {

  return (
    <>   
      <NavBar/>

      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/products" element={<ProductList/>}>
          <Route path="details/:id" element={<ViewProduct></ViewProduct>}>
          </Route>
        </Route>
        <Route path="/cart" element={<Cart />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-product" element={<ProtectRoute role="MANAGER"><AddProduct /></ProtectRoute>} />
        <Route path="/profile" element={<ProtectRoute role="USER"><Profile /></ProtectRoute>} />
        <Route path="/update-product" element={<ProtectRoute role="MANAGER">
          <UpdateProduct/>
          </ProtectRoute>} />
      </Routes>

    </>
  )
}

export default App
