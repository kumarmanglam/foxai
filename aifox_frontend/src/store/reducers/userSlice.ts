import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isUserLoggedIn: false,
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsUserLoggedIn(state, action) {
            state.isUserLoggedIn = action.payload;
        }
    }
})

export const { setIsUserLoggedIn } = UserSlice.actions;

export default UserSlice.reducer;