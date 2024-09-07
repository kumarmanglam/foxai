import { createSelector } from "@reduxjs/toolkit";


export const selectUserStore = (state: any) => state.user;

export const selectIsUserLoggedIn = createSelector(selectUserStore, (state) => state.isUserLoggedIn);

