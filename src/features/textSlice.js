import { createSlice } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    data: {
      text1: "",
      text2: "",
      text3: "",
      text4: "",
    },
  },
  reducers: {
    changeText: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { changeText } = textSlice.actions;
export default textSlice.reducer;
