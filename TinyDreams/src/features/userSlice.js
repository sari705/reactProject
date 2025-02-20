import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload
        },
        userOut: (state, action) => {
            state.currentUser = null;
        },
    }

})

export default userSlice.reducer;
export const { userIn, userOut } = userSlice.actions;