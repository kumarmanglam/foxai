import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./reducers/chatSlice";
import userSlice from "./reducers/userSlice";

const reduxStore = configureStore({
    reducer: {
        chat: chatSlice,
        user: userSlice
    }
});

export default reduxStore;