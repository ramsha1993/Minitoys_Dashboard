import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import capexReducer from './capex'
const store = configureStore({
  reducer: {
    auth: AuthReducer,
     capex: capexReducer,

  },
});

export default store;