import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutStateType {
  step: 1 | 2 | 3 | 4 | 5;
}

const initialState: CheckoutStateType = {
  step: 1,
};

export const checkoutSlice = createSlice({
  name: "checkoutStore",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<1 | 2 | 3 | 4 | 5>) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      console.log("yes");

      if (state.step < 5) state.step += 1;
    },
  },
});

export const { nextStep, setStep } = checkoutSlice.actions;

export default checkoutSlice.reducer;
