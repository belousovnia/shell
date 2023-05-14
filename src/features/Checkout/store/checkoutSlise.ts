import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OverallFormType,
  IPFormType,
  OOOFormType,
  RegistrationAddressFormType,
  AddressResidenceFormType,
  SocialMediaItemType,
} from "../types";

export interface CheckoutStateType {
  step: 1 | 2 | 3 | 4 | 5;
  overallForm: OverallFormType | null;
  ownershipForm: IPFormType | OOOFormType | null;
  registrationAddress: RegistrationAddressFormType | null;
  addressResidenceForm: AddressResidenceFormType | null;
  socialMediaForm: SocialMediaItemType[] | null;
}

const initialState: CheckoutStateType = {
  step: 1,
  overallForm: null,
  ownershipForm: null,
  registrationAddress: null,
  addressResidenceForm: null,
  socialMediaForm: null,
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
    setOverallForm: (state, action: PayloadAction<OverallFormType>) => {
      state.overallForm = action.payload;
    },
    setOwnershipForm: (
      state,
      action: PayloadAction<IPFormType | OOOFormType>
    ) => {
      state.ownershipForm = action.payload;
    },
    setRegistrationAddress: (
      state,
      action: PayloadAction<RegistrationAddressFormType>
    ) => {
      state.registrationAddress = action.payload;
    },
    setAddressResidence: (
      state,
      action: PayloadAction<AddressResidenceFormType>
    ) => {
      state.addressResidenceForm = action.payload;
    },
    setSocialMediaForm: (
      state,
      action: PayloadAction<SocialMediaItemType[]>
    ) => {
      state.socialMediaForm = action.payload;
    },
  },
});

export const {
  nextStep,
  setStep,
  setOverallForm,
  setOwnershipForm,
  setRegistrationAddress,
  setAddressResidence,
  setSocialMediaForm,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
