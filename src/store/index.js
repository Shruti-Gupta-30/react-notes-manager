import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "store/notes/notes-slice";
import { authReducer } from "store/auth/auth-slice";

import storage from "redux-persist/lib/storage";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

//1 Combine the reducers (slices content) into a single reducer
const rootReducer = combineReducers({
	notesSlice: notesReducer,
	authSlice: authReducer,
});
//2 Create a basic configuration to tell redux to use the local storage
const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["authSlice"],
};

//3 Persist the reducers
const persistedReducers = persistReducer(persistConfig, rootReducer);

//4 Send the persisted reducers to the store and 8 Tell Redux to ignore all the actions sent by redux-persist
const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

//5 Create a persisted version of the store
const persistor = persistStore(store);

//6 Export the persisted version of the store
export { store, persistor };

//7 Use the redusx Persist Gate component to give your app access to persisted store (in index.js root file)
