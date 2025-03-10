import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    sum: 0,
    amountInCart: 0
}

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
        },

        removeProduct: (state, action) => {
            let index = state.products.findIndex(p => p._id === action.payload._id)            
            let qty = state.products[index].amount
            state.amountInCart -= qty
            state.sum -= action.payload.price * qty;
            state.products.splice(index, 1)
        }

    }

})

export const { addToCart, removeProduct, updateAmount } = cartSlice.actions;
export default cartSlice.reducer;