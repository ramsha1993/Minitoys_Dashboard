import { createSlice } from "@reduxjs/toolkit";

const capexSlice = createSlice({
  name: "capex",
  initialState: {
    list: [], // all capex rows
  },

  reducers: {
    setCapexList: (state, action) => {
      state.list = action.payload;
    },

    addCapex: (state, action) => {
      state.list.push(action.payload);
    },

    deleteCapex: (state, action) => {
      state.list = state.list.filter((_, i) => i !== action.payload);
    },
  },
});

export const { setCapexList, addCapex, deleteCapex } = capexSlice.actions;
export default capexSlice.reducer;
