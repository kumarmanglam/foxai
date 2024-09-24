import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isUserLoggedIn: false,
    userEmail: '',
    userRole: '',
    userDepartment: '',
    documentId: '',
    userId: ''
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsUserLoggedIn(state, action) {
            state.isUserLoggedIn = action.payload;
        },
        setUserEmail(state, action) {
            state.userEmail = action.payload;
        },
        setUserRole(state, action) {
            state.userRole = action.payload;
        },
        setUserDepartment(state, action) {
            state.userDepartment = action.payload;
        },
        setdocumentId(state, action) {
            state.documentId = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        }
    }
})

export const { setIsUserLoggedIn, setUserEmail, setUserRole, setUserDepartment, setUserId } = UserSlice.actions;

export default UserSlice.reducer;