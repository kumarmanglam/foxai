import { createSelector } from "@reduxjs/toolkit";


export const selectChatStore = (state: any) => state.chat;

export const selectChatHistory = createSelector(selectChatStore, (state) => state.chatHistory);

