import { SatelliteSharp } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'


const storedCart = JSON.parse(localStorage.getItem("cart")) || { products: [], sum: 0, amountInCart: 0 };

const initialState = storedCart;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.products.findIndex(p => p._id === action.payload._id)
            if (index > -1) {
                state.products[index].amount++
            }
            else {
                state.products.push({ ...action.payload, amount: 1 })
            }
            state.amountInCart++;
            state.sum += action.payload.price;

            localStorage.setItem("cart", JSON.stringify({
                products: state.products,
                sum: state.sum,
                amountInCart: state.amountInCart
            }));

        },
        updateAmount: (state, action) => {
            let index = state.products.findIndex(p => p._id === action.payload._id)
            if (state.products[index].amount > 1) {
                state.products[index].amount--
            }
            else {
                state.products.splice(index, 1)
            }
            state.amountInCart--;
            state.sum -= action.payload.price;

            localStorage.setItem("cart", JSON.stringify({
                products: state.products,
                sum: state.sum,
                amountInCart: state.amountInCart
            }));
        },

        removeProduct: (state, action) => {
            let index = state.products.findIndex(p => p._id === action.payload._id)
            let qty = state.products[index].amount
            state.amountInCart -= qty
            state.sum -= action.payload.price * qty;
            state.products.splice(index, 1)

            localStorage.setItem("cart", JSON.stringify({
                products: state.products,
                sum: state.sum,
                amountInCart: state.amountInCart
            }));
        }
        , pushFromLocalStorage: (state, action) => {
            state.products = action.payload.products;
            state.sum = action.payload.sum;
            state.amountInCart = action.payload.amountInCart;
        } ,
        emptyingCart: (state, action) => {
            state.products = [];
            state.sum = 0;
            state.amountInCart = 0;
        }

    }

})

export const { addToCart, removeProduct, updateAmount, pushFromLocalStorage, emptyingCart } = cartSlice.actions;
export default cartSlice.reducer;