import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../app/contactSlice";

const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export default store;
