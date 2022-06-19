import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const actionSanitizer = (action: any) =>
  action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
    ? { ...action, data: "<<LONG_BLOB>>" }
    : action;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: {
    actionSanitizer,
  },
});

store.getState();
export default store;
