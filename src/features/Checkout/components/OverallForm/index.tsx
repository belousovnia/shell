import { HandySvg } from "handy-svg";
import styles from "./styles.module.scss";
import iconOverallForm from "src/assets/images/iconOverallForm.svg";
import Select from "src/components/ui-components/Select";
import { useCallback, useEffect, useState } from "react";
import GenderSelect from "src/components/ui-components/GenderSelect";
import DateInput from "src/components/ui-components/DateInput";
import { maskNameOptions } from "src/constants/imask";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setOverallForm } from "../../store/checkoutSlise";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { OverallFormType } from "../../types";
import Input from "src/components/ui-components/Input";
import { citizenship } from "src/constants/data";

export default function OverallForm() {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [selectCity, setSelectCity] = useState<string | null>(null);
  const [selectCitizenship, setSelectCitizenship] = useState<string | null>(
    null
  );
  const [gender, setGender] = useState<"man" | "woman">("man");
  const [birthday, setBirthday] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");

  const [errorLastName, setErrorLastName] = useState("");
  const [errorPatronymic, setErrorPatronymic] = useState("");
  const [errorSelectCity, setErrorSelectCity] = useState("");
  const [errorSelectCitizenship, setErrorSelectCitizenship] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");
  const [errorPlaceOfBirth, setErrorPlaceOfBirth] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");

  const validationOverallForm = useCallback(() => {
    let newErrorFirstName: string = "";
    let newErrorLastName: string = "";
    let newErrorPatronymic: string = "";
    let newErrorSelectCity: string = "";
    let newErrorSelectCitizenship: string = "";
    let newErrorBirthday: string = "";
    let newErrorPlaceOfBirth: string = "";

    if (!lastName) newErrorLastName = "Обязательное поле";
    if (!patronymic) newErrorPatronymic = "Обязательное поле";
    if (!firstName) newErrorFirstName = "Обязательное поле";
    if (!selectCity) newErrorSelectCity = "Обязательное поле";
    if (!selectCitizenship) newErrorSelectCitizenship = "Обязательное поле";
    if (!placeOfBirth) newErrorPlaceOfBirth = "Обязательное поле";

    if (!birthday) {
      newErrorBirthday = "Обязательное поле";
    } else if (birthday.length !== 10) {
      newErrorBirthday = "Неполная дата";
    }

    setErrorFirstName(newErrorFirstName);
    setErrorLastName(newErrorLastName);
    setErrorPatronymic(newErrorPatronymic);
    setErrorSelectCity(newErrorSelectCity);
    setErrorSelectCitizenship(newErrorSelectCitizenship);
    setErrorPlaceOfBirth(newErrorPlaceOfBirth);
    setErrorBirthday(newErrorBirthday);

    const status: boolean =
      !newErrorFirstName &&
      !newErrorLastName &&
      !newErrorPatronymic &&
      !newErrorSelectCitizenship &&
      !newErrorBirthday &&
      !newErrorPlaceOfBirth &&
      !newErrorSelectCity;

    return status;
  }, [
    birthday,
    firstName,
    lastName,
    patronymic,
    placeOfBirth,
    selectCitizenship,
    selectCity,
  ]);

  function installValuesFromStore() {
    if (checkoutStore.overallForm) {
      setBirthday(checkoutStore.overallForm.birthday);
      setSelectCity(checkoutStore.overallForm.city);
      setSelectCitizenship(checkoutStore.overallForm.citizenship);
      setGender(checkoutStore.overallForm.gender);
      setPlaceOfBirth(checkoutStore.overallForm.placeOfBirth);
      setFirstName(checkoutStore.overallForm.firstName);
      setLastName(checkoutStore.overallForm.lastName);
      setPatronymic(checkoutStore.overallForm.patronymic);
    }
  }

  function acceptForm() {
    if (validationOverallForm()) {
      if (
        firstName &&
        lastName &&
        patronymic &&
        selectCity &&
        selectCitizenship
      ) {
        const dataForm: OverallFormType = {
          firstName: firstName,
          lastName: lastName,
          patronymic: patronymic,
          city: selectCity,
          citizenship: selectCitizenship,
          birthday: birthday,
          placeOfBirth: placeOfBirth,
          gender: gender,
        };

        dispatch(setOverallForm(dataForm));
        navigate("type-ownership");
        if (checkoutStore.step === 1) dispatch(nextStep());
      }
    }
  }

  useEffect(() => {
    installValuesFromStore();
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <HandySvg src={iconOverallForm} className={styles.icon} />
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>Общие</h1>
          <p className={styles.subtitle}>Введите свои персональные данные.</p>
        </div>
        <div className={styles.formLine}>
          <Input
            value={lastName}
            setValue={setLastName}
            placeholder="Васильев"
            title="Фамилия*"
            errorString={errorLastName}
            maskOption={maskNameOptions}
          />

          <Input
            value={firstName}
            setValue={setFirstName}
            placeholder="Иван"
            title="Имя*"
            errorString={errorFirstName}
            maskOption={maskNameOptions}
          />
        </div>
        <div className={styles.formLine}>
          <Input
            value={patronymic}
            setValue={setPatronymic}
            placeholder="Сергеевич"
            title="Отчество*"
            errorString={errorPatronymic}
            maskOption={maskNameOptions}
          />
          <Select
            title="Основной город*"
            value={selectCity}
            setValue={setSelectCity}
            options={[{ value: "Москва" }, { value: "Санкт-Петербург" }]}
            placeholder="выберите город"
            errorString={errorSelectCity}
          />
        </div>
        <div className={styles.formLine}>
          <Select
            title="Гражданство*"
            value={selectCitizenship}
            setValue={setSelectCitizenship}
            options={citizenship}
            placeholder="выберите гражданство"
            errorString={errorSelectCitizenship}
          />
          <div className={(styles.inputBlock, styles.inputBlock_split)}>
            <GenderSelect title="Пол*" setValue={setGender} value={gender} />
            <DateInput
              title="Дата рождения*"
              value={birthday}
              setValue={setBirthday}
              errorString={errorBirthday}
            />
          </div>
        </div>
        <div className={styles.formMonoLine}>
          <Input
            value={placeOfBirth}
            setValue={setPlaceOfBirth}
            placeholder="Введите наименование региона и населенного пункта"
            title="Место рождения (как указано в паспорте)*"
            errorString={errorPlaceOfBirth}
            maskOption={null}
          />
        </div>
      </div>
      <div className={styles.formFooter}>
        <button className={styles.linkButton} disabled={true}>
          Отмена
        </button>
        <button className={styles.button} onClick={acceptForm}>
          Далее
        </button>
      </div>
    </div>
  );
}

