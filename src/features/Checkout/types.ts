export interface OverallFormType {
  firstName: string;
  lastName: string;
  patronymic: string;
  city: string;
  citizenship: string;
  birthday: string;
  placeOfBirth: string;
  gender: "man" | "woman";
}

export interface IPFormType {
  TypeOwnership: "ИП" | "ООО";
  iNN: string;
  oGRNIP: string;
  scanINN: FileList;
  scanOGRNIP: FileList;
  scanLeaseContract: FileList | null;
  scanEGRIP: FileList;
  dateRegistration: string;
}

export interface OOOFormType {
  TypeOwnership: "ИП" | "ООО";
  nameFull: string;
  nameAbbreviated: string;
  iNN: string;
  oGRN: string;
  scanINN: FileList;
  scanOGRN: FileList;
  dateRegistration: string;
}

export interface RegistrationAddressFormType {
  countryRegistration: string;
  regionRegistration: string;
  city: string;
  street: string;
  houseNumber: string;
  apartment: string | null;
  dateRegistration: string;
}

export interface AddressResidenceFormType {
  isMatch: boolean;
  countryRegistration: string;
  regionRegistration: string;
  city: string;
  street: string;
  houseNumber: string;
  apartment: string | null;
  dateRegistration: string;
}

export interface SocialMediaItemType {
  name: string;
  src: string;
}


