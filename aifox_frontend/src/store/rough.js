import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './reducers'; // Import your root reducer type

// Define your RootState based on the rootReducer

export type RootState = ReturnType<typeof rootReducer>;

// Define persist config type with the RootState type

type PersistConfigType = PersistConfig<RootState>;

// Persist configuration with proper typing

const persistConfig: PersistConfigType = {

    key: 'root', // key for the persisted state in storage

    storage,     // using localStorage

    whitelist: ['mobile', 'cover'] // only persist these slices of state

};

// Wrap the rootReducer with persistReducer and type it

const persistedReducer = persistReducer < RootState > (persistConfig, rootReducer);

// Configure the store with the persisted reducer

export const store = configureStore({

    reducer: persistedReducer,

    // Optionally add middleware if needed

});

export const persistor = persistStore(store);

