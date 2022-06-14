import rootReducer from "./reducers"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(
  {reducer:rootReducer},
);

store.getState()

export default store;