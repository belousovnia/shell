import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OverallFormType } from "../types";

export interface CheckoutStateType {
  step: 1 | 2 | 3 | 4 | 5;
  overallForm: OverallFormType | null;
}

const initialState: CheckoutStateType = {
  step: 1,
  overallForm: null,
};

export const checkoutSlice = createSlice({
  name: "checkoutStore",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<1 | 2 | 3 | 4 | 5>) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      if (state.step < 5) state.step += 1;
    },
    previousStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    setOverallForm: (state, action: PayloadAction<OverallFormType>) => {
      state.overallForm = action.payload;
    },
  },
});

export const { nextStep, previousStep, setStep, setOverallForm } = checkoutSlice.actions;

export default checkoutSlice.reducer;
