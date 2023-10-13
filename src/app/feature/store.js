import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import thunk from "redux-thunk";
import persistStore from "redux-persist/lib/persistStore"
const persistConfig = {
  key: "root",
  storage,
};

const persistReduce = persistReducer(persistConfig, userSlice.reducer);
export const store = configureStore({
  reducer: persistReduce,
  middleware: [thunk],
});
export const persistor = persistStore(store);
