import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import thunk from "redux-thunk";
import persistStore from "redux-persist/lib/persistStore";
const persistConfig = {
  key: "root",
  storage,
};

const reduceMerge = combineReducers({
  userReducer: userSlice.reducer,
});

const persistReduce = persistReducer(persistConfig, reduceMerge);
export const store = configureStore({
  reducer: persistReduce,
  middleware: [thunk],
});
export const persistor = persistStore(store);
