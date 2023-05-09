import { HandySvg } from "handy-svg";
import styles from "./styles.module.scss";
import iconOverallForm from "src/assets/images/iconOverallForm.svg";
import Select from "src/components/ui-components/Select";
import { useCallback, useEffect, useRef, useState } from "react";
import GenderSelect from "src/components/ui-components/GenderSelect";
import DateInput from "src/components/ui-components/DateInput";
import IMask, { InputMask } from "imask";
import { maskNameOptions } from "src/constants/imask";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setOverallForm } from "../../store/checkoutSlise";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { OverallFormType } from "../../types";

export default function OverallForm() {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [selectCity, setSelectCity] = useState<string | null>(null);
  const [selectCitizenship, setSelectCitizenship] = useState<string | null>(
    null
  );
  const [gender, setGender] = useState<"man" | "woman">("man");
  const [birthday, setBirthday] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");

  const [maskFirstName, setMaskFirstName] = useState<InputMask<any> | null>(
    null
  );
  const [maskLastName, setMaskLastName] = useState<InputMask<any> | null>(null);
  const [maskPatronymic, setMaskPatronymic] = useState<InputMask<any> | null>(
    null
  );

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const patronymicInputRef = useRef<HTMLInputElement>(null);

  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorPatronymic, setErrorPatronymic] = useState("");
  const [errorSelectCity, setErrorSelectCity] = useState("");
  const [errorSelectCitizenship, setErrorSelectCitizenship] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");
  const [errorPlaceOfBirth, setErrorPlaceOfBirth] = useState("");

  const validationOverallForm = useCallback(() => {
    const firstName = maskFirstName ? maskFirstName.unmaskedValue : "";
    const lastName = maskLastName ? maskLastName.unmaskedValue : "";
    const patronymic = maskPatronymic ? maskPatronymic.unmaskedValue : "";
    let newErrorFirstName: string = "";
    let newErrorLastName: string = "";
    let newErrorPatronymic: string = "";
    let newErrorSelectCity: string = "";
    let newErrorSelectCitizenship: string = "";
    let newErrorBirthday: string = "";
    let newErrorPlaceOfBirth: string = "";

    if (!firstName) newErrorFirstName = "Обязательное поле";
    if (!lastName) newErrorLastName = "Обязательное поле";
    if (!patronymic) newErrorPatronymic = "Обязательное поле";

    if (!selectCity) newErrorSelectCity = "Обязательное поле";
    if (!selectCitizenship) newErrorSelectCitizenship = "Обязательное поле";
    if (!placeOfBirth) newErrorPlaceOfBirth = "Обязательное поле";

    if (!birthday) {
      newErrorBirthday = "Обязательное поле";
    } else if (birthday.length !== 10) {
      newErrorBirthday = "Неверная дата";
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
    maskFirstName,
    maskLastName,
    maskPatronymic,
    placeOfBirth,
    selectCitizenship,
    selectCity,
  ]);

  function installValuesFromStore() {
    if (
      checkoutStore.overallForm &&
      maskFirstName &&
      maskLastName &&
      maskPatronymic
    ) {
      maskFirstName.unmaskedValue = checkoutStore.overallForm.firstName;
      maskLastName.unmaskedValue = checkoutStore.overallForm.lactName;
      maskPatronymic.unmaskedValue = checkoutStore.overallForm.patronymic;
      setBirthday(checkoutStore.overallForm.birthday);
      setSelectCity(checkoutStore.overallForm.city);
      setSelectCitizenship(checkoutStore.overallForm.citizenship);
      setGender(checkoutStore.overallForm.gender);
      setPlaceOfBirth(checkoutStore.overallForm.placeOfBirth);
    }
  }

  function acceptForm() {
    if (validationOverallForm()) {
      if (
        checkoutStore.step === 1 &&
        maskFirstName &&
        maskLastName &&
        maskPatronymic &&
        selectCity &&
        selectCitizenship
      ) {
        const dataForm: OverallFormType = {
          firstName: maskFirstName.unmaskedValue,
          lactName: maskLastName.unmaskedValue,
          patronymic: maskPatronymic.unmaskedValue,
          city: selectCity,
          citizenship: selectCitizenship,
          birthday: birthday,
          placeOfBirth: placeOfBirth,
          gender: gender,
        };

        dispatch(setOverallForm(dataForm));
        dispatch(nextStep());
      }
      navigate("type-ownership");
    }
  }

  useEffect(() => {
    if (firstNameInputRef.current)
      setMaskFirstName(IMask(firstNameInputRef.current, maskNameOptions));
    if (lastNameInputRef.current)
      setMaskLastName(IMask(lastNameInputRef.current, maskNameOptions));
    if (patronymicInputRef.current)
      setMaskPatronymic(IMask(patronymicInputRef.current, maskNameOptions));

    return () => {
      maskFirstName?.destroy();
      maskLastName?.destroy();
      maskPatronymic?.destroy();
    };
  }, []);

  useEffect(() => {
    installValuesFromStore();
  }, [maskFirstName, maskLastName, maskPatronymic]);

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <HandySvg src={iconOverallForm} className={styles.icon} />
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>Общие</h1>
          <p className={styles.subtitle}>Введите свои персональные данные.</p>
        </div>
        <div className={styles.formLine}>
          <div className={styles.inputBlock}>
            <h2 className={styles.inputTitle}>Фамилия*</h2>
            <input
              ref={lastNameInputRef}
              type="text"
              placeholder="Васильев"
              className={classNames(styles.input, {
                [styles.input_error]: errorLastName,
              })}
            />
            <p className={styles.textError}>{errorLastName}</p>
          </div>
          <div className={styles.inputBlock}>
            <h2 className={styles.inputTitle}>Имя*</h2>
            <input
              ref={firstNameInputRef}
              placeholder="Иван"
              type="text"
              className={classNames(styles.input, {
                [styles.input_error]: errorFirstName,
              })}
            />
            <p className={styles.textError}>{errorFirstName}</p>
          </div>
        </div>
        <div className={styles.formLine}>
          <div className={styles.inputBlock}>
            <h2 className={styles.inputTitle}>Отчество*</h2>
            <input
              ref={patronymicInputRef}
              type="text"
              placeholder="Сергеевич"
              className={classNames(styles.input, {
                [styles.input_error]: errorPatronymic,
              })}
            />
            <p className={styles.textError}>{errorPatronymic}</p>
          </div>
          <div className={styles.inputBlock}>
            <h2 className={styles.inputTitle}>Основной город*</h2>
            <Select
              value={selectCity}
              setValue={setSelectCity}
              options={[{ value: "Москва" }, { value: "Санкт-Петербург" }]}
              placeholder="выберите город"
              error={!!errorSelectCity}
            />
            <p className={styles.textError}>{errorSelectCity}</p>
          </div>
        </div>
        <div className={styles.formLine}>
          <div className={styles.inputBlock}>
            <h2 className={styles.inputTitle}>Гражданство*</h2>
            <Select
              value={selectCitizenship}
              setValue={setSelectCitizenship}
              options={[
                { value: "Россия" },
                { value: "Казахстан" },
                { value: "Беларусь" },
                { value: "Иное" },
              ]}
              placeholder="выберите гражданство"
              error={!!errorSelectCitizenship}
            />
            <p className={styles.textError}>{errorSelectCitizenship}</p>
          </div>
          <div className={(styles.inputBlock, styles.inputBlock_split)}>
            <div className={styles.inputBlock}>
              <h2 className={styles.inputTitle}>Пол*</h2>
              <GenderSelect setValue={setGender} value={gender} />
            </div>
            <div className={styles.inputBlock}>
              <h2 className={styles.inputTitle}>Дата рождения*</h2>
              <DateInput
                value={birthday}
                setValue={setBirthday}
                isError={!!errorBirthday}
              />
              <p className={styles.textError}>{errorBirthday}</p>
            </div>
          </div>
        </div>
        <div className={styles.formMonoLine}>
          <div className={styles.inputBlock}>
            <h2 className={styles.inputTitle}>
              Место рождения (как указано в паспорте)*
            </h2>
            <input
              type="text"
              placeholder="Введите наименование региона и населенного пункта"
              className={classNames(styles.input, {
                [styles.input_error]: errorPlaceOfBirth,
              })}
              value={placeOfBirth}
              onInput={(i) => setPlaceOfBirth(i.currentTarget.value)}
            />
            <p className={styles.textError}>{errorPlaceOfBirth}</p>
          </div>
        </div>
      </div>
      <div className={styles.formFooter}>
        <button className={styles.linkButton}>Отмена</button>
        <button className={styles.button} onClick={acceptForm}>
          Далее
        </button>
      </div>
    </div>
  );
}

