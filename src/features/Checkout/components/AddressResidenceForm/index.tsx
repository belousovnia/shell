import { HandySvg } from "handy-svg";
import styles from "./styles.module.scss";
import iconAddressResidence from "src/assets/images/iconAddressResidence.svg";
import classNames from "classnames";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import Checkbox from "src/components/ui-components/Checkbox";
import DateInput from "src/components/ui-components/DateInput";
import Input from "src/components/ui-components/Input";
import Select, { OptionSelectType } from "src/components/ui-components/Select";
import { placeRegistration } from "src/constants/data";
import { maskAddress } from "src/constants/imask";
import {
  setRegistrationAddress,
  nextStep,
  setAddressResidence,
} from "../../store/checkoutSlise";
import {
  AddressResidenceFormType,
  RegistrationAddressFormType,
} from "../../types";

export default function AddressResidenceForm() {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [isMatch, setIsMatch] = useState(false);

  const [countryRegistration, setCountryRegistration] = useState("");
  const [regionRegistration, setRegionRegistration] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [isNotApartment, setIsNotApartment] = useState(false);
  const [houseNumber, setHouseNumber] = useState("");
  const [apartment, setApartment] = useState("");
  const [dateRegistration, setDateRegistration] = useState("");

  const [errorCountryRegistration, setErrorCountryRegistration] = useState("");
  const [errorRegionRegistration, setErrorRegionRegistration] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorStreet, setErrorStreet] = useState("");
  const [errorHouseNumber, setErrorHouseNumber] = useState("");
  const [errorApartment, setErrorApartment] = useState("");
  const [errorDateRegistration, setErrorDateRegistration] = useState("");

  const [optionRegions, setOptionRegions] = useState<OptionSelectType[]>([]);

  const validationAddressResidenceForm = useCallback(() => {
    let newErrorCountryRegistration = "";
    let newErrorRegionRegistration = "";
    let newErrorCity = "";
    let newErrorStreet = "";
    let newErrorHouseNumber = "";
    let newErrorApartment = "";
    let newErrorDateRegistration = "";

    if (!countryRegistration) newErrorCountryRegistration = "Обязательное поле";
    if (!regionRegistration) newErrorRegionRegistration = "Обязательное поле";
    if (!city) newErrorCity = "Обязательное поле";
    if (!street) newErrorStreet = "Обязательное поле";
    if (!houseNumber) newErrorHouseNumber = "Обяз. ";
    if (!isNotApartment && !apartment) newErrorApartment = "Обяз.";

    if (!dateRegistration) {
      newErrorDateRegistration = "Обязательное поле";
    } else if (dateRegistration.length !== 10) {
      newErrorDateRegistration = "Неполная дата";
    }

    setErrorCountryRegistration(newErrorCountryRegistration);
    setErrorRegionRegistration(newErrorRegionRegistration);
    setErrorCity(newErrorCity);
    setErrorStreet(newErrorStreet);
    setErrorHouseNumber(newErrorHouseNumber);
    setErrorApartment(newErrorApartment);
    setErrorDateRegistration(newErrorDateRegistration);

    const status: boolean =
      !newErrorCountryRegistration &&
      !newErrorRegionRegistration &&
      !newErrorCity &&
      !newErrorStreet &&
      !newErrorHouseNumber &&
      !newErrorApartment &&
      !newErrorDateRegistration;

    return status;
  }, [
    apartment,
    city,
    countryRegistration,
    houseNumber,
    isNotApartment,
    regionRegistration,
    street,
    dateRegistration,
  ]);

  function changeCountry(value: string) {
    setRegionRegistration("");

    const item = placeRegistration.find((i) => i.value === value)?.region;

    if (item) {
      setCountryRegistration(value);
      setOptionRegions(item);
    }
  }

  function acceptForm() {
    if (validationAddressResidenceForm()) {
      const dataForm: AddressResidenceFormType = {
        isMatch: isMatch,
        countryRegistration: countryRegistration,
        regionRegistration: regionRegistration,
        city: city,
        street: street,
        houseNumber: houseNumber,
        apartment: isNotApartment ? null : apartment,
        dateRegistration: dateRegistration,
      };

      dispatch(setAddressResidence(dataForm));
      navigate("/social-media");

      if (checkoutStore.step === 4) dispatch(nextStep());
    }
  }

  function installValuesFromStore(isMatch: boolean) {
    if (isMatch && checkoutStore.registrationAddress) {
      setCountryRegistration(
        checkoutStore.registrationAddress.countryRegistration
      );
      changeCountry(checkoutStore.registrationAddress.countryRegistration);
      setRegionRegistration(
        checkoutStore.registrationAddress.regionRegistration
      );
      setCity(checkoutStore.registrationAddress.city);
      setStreet(checkoutStore.registrationAddress.street);
      setHouseNumber(checkoutStore.registrationAddress.houseNumber);
      setDateRegistration(checkoutStore.registrationAddress.dateRegistration);

      checkoutStore.registrationAddress.apartment
        ? setApartment(checkoutStore.registrationAddress.apartment)
        : setIsNotApartment(true);
    } else if (!isMatch && checkoutStore.addressResidenceForm) {
      setCountryRegistration(
        checkoutStore.addressResidenceForm.countryRegistration
      );
      changeCountry(checkoutStore.addressResidenceForm.countryRegistration);
      setRegionRegistration(
        checkoutStore.addressResidenceForm.regionRegistration
      );
      setCity(checkoutStore.addressResidenceForm.city);
      setStreet(checkoutStore.addressResidenceForm.street);
      setHouseNumber(checkoutStore.addressResidenceForm.houseNumber);
      setDateRegistration(checkoutStore.addressResidenceForm.dateRegistration);

      checkoutStore.addressResidenceForm.apartment
        ? setApartment(checkoutStore.addressResidenceForm.apartment)
        : setIsNotApartment(true);
    }
  }

  useEffect(() => {
    if (checkoutStore.addressResidenceForm)
      installValuesFromStore(checkoutStore.addressResidenceForm.isMatch);
  }, []);

  useEffect(() => {
    if (isMatch) installValuesFromStore(isMatch);
  }, [isMatch]);

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <HandySvg src={iconAddressResidence} className={styles.icon} />
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>Адрес регистрации</h1>
          <p className={styles.subtitle}>
            Введите свой действуйющий адрес прописки.
          </p>
        </div>
        <div className={styles.formMonoLine}>
          <Checkbox
            value={isMatch}
            title="Адрес регистрации и фактического проживания совпадают"
            setValue={setIsMatch}
          />
        </div>
        <div className={styles.formLine}>
          <Select
            title="Страна*"
            value={countryRegistration}
            setValue={changeCountry}
            options={placeRegistration}
            placeholder="Выберите страну"
            errorString={errorCountryRegistration}
            isDisabled={isMatch}
          />
          <Select
            title="Регион*"
            value={regionRegistration}
            setValue={setRegionRegistration}
            options={optionRegions}
            placeholder="Выберите регион"
            errorString={errorRegionRegistration}
            isDisabled={isMatch}
          />
        </div>
        <div className={styles.formLine}>
          <Input
            value={city}
            setValue={setCity}
            placeholder="Введите населенный пункт"
            title="Город / Населенный пункт*"
            errorString={errorCity}
            maskOption={null}
            isDisabled={isMatch}
          />
          <Input
            value={street}
            setValue={setStreet}
            placeholder="Введите улицу"
            title="Улица*"
            errorString={errorStreet}
            maskOption={null}
            isDisabled={isMatch}
          />
        </div>
        <div className={classNames(styles.formLine)}>
          <div
            className={classNames(
              styles.formLine,
              styles.formLine_112,
              styles.formLine_inputBlock
            )}
          >
            <Input
              value={houseNumber}
              setValue={setHouseNumber}
              placeholder="0"
              title="Дом*"
              errorString={errorHouseNumber}
              maskOption={maskAddress}
              className={styles.input_small}
              isDisabled={isMatch}
            />
            <Input
              value={apartment}
              setValue={setApartment}
              title="Квартира*"
              placeholder="0"
              errorString={errorApartment}
              maskOption={maskAddress}
              isDisabled={isNotApartment || isMatch}
              className={styles.input_small}
            />
            <div className={styles.registrationAddress}>
              <Checkbox
                value={isNotApartment}
                title="Нет квартиры"
                setValue={setIsNotApartment}
                isDisabled={isMatch}
              />
            </div>
          </div>
          <div
            className={classNames(styles.formLine, styles.formLine_inputBlock)}
          >
            <DateInput
              title="Дата рождения*"
              value={dateRegistration}
              setValue={setDateRegistration}
              errorString={errorDateRegistration}
              isDisabled={isMatch}
            />
          </div>
        </div>
      </div>
      <div className={styles.formFooter}>
        <button
          className={styles.linkButton}
          onClick={() => navigate("/registration-address")}
        >
          Отмена
        </button>
        <button className={styles.button} onClick={acceptForm}>
          Далее
        </button>
      </div>
    </div>
  );
}
