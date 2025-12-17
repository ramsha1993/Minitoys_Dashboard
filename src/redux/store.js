import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import capexReducer from './capex'
import userReducer from './user'
const store = configureStore({
  reducer: {
    auth: AuthReducer,
     capex: capexReducer,
     user:userReducer

  },
});

export default store;