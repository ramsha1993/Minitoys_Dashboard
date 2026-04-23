import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // Initialize the user state from localStorage if available
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    // Set the user data in Redux and localStorage
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },

    // Clear the user data in Redux and localStorage
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from localStorage
    },
  },
});

// Export actions to dispatch
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
