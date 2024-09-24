import { createSelector } from "@reduxjs/toolkit";


export const selectUserStore = (state: any) => state.user;

export const selectIsUserLoggedIn = createSelector(selectUserStore, (state) => state.isUserLoggedIn);

export const selectUserEmail = createSelector(selectUserStore, (state) => state.userEmail);

export const selectUserRole = createSelector(selectUserStore, (state) => state.userRole);

export const selectUserDepartment = createSelector(selectUserStore, (state) => state.userDepartment);

export const selectDocumentId = createSelector(selectUserStore, (state) => state.setdocumentId);

export const selectUserId = createSelector(selectUserStore, (state) => state.setUserId);

