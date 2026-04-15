import { createSlice } from "@reduxjs/toolkit";

const Authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,  
    isLoggedIn: false,
  },
  reducers: {
    LoginUser: (state, action) => {
        console.log("REDUX RECEIVED PAYLOAD:", action.payload);

      state.user = action.payload.user;
      state.token = action.payload.token;
        localStorage.setItem("token", state.token);
      console.log("My token" + state.token)
            console.log("My user" + state.user.name)

      state.isLoggedIn = true;
            

    },
    LogoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");

    },
  },
});
// allows to dispatch actions
export const { LoginUser, LogoutUser } = Authslice.actions;
// allows to add reducers in the redux store
export default Authslice.reducer;