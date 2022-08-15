import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "setting-drop",
  initialState: {
    data: {
      value: false,
      font_color: "black",
      font_size: "",
      font_family: "",
      text_align: "",
      bg_color: "",
      txt_border: "",
    },
  },
  reducers: {
    dropChange: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { dropChange } = settingsSlice.actions;
export default settingsSlice.reducer;
