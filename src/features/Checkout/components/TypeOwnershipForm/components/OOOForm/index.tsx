import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import styles from "./styles.module.scss";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import Input from "src/components/ui-components/Input";
import DateInput from "src/components/ui-components/DateInput";
import { maskINNOptions, maskOGRNOptions } from "src/constants/imask";
import FileInput from "src/components/ui-components/FileInput";
import { OOOFormType } from "src/features/Checkout/types";
import {
  nextStep,
  setOwnershipForm,
  setStep,
} from "src/features/Checkout/store/checkoutSlise";
import { iNNData } from "src/constants/data";

interface OOOFormPropsType {
  isHidden?: boolean;
}

export default function OOOForm({ isHidden = true }: OOOFormPropsType) {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [nameFull, setnameFull] = useState("");
  const [nameAbbreviated, setNameAbbreviated] = useState("");
  const [iNN, setINN] = useState<string>("");
  const [scanINN, setScanINN] = useState<FileList | null>(null);
  const [dateRegistration, setDateRegistration] = useState("");
  const [oGRN, setOGRN] = useState("");
  const [scanOGRN, setScanOGRN] = useState<FileList | null>(null);

  const [errorNameFull, setErrorNameFull] = useState("");
  const [errorNameAbbreviated, setErrorNameAbbreviated] = useState("");
  const [errorDateRegistration, setErrorDateRegistration] = useState("");
  const [errorINN, setErrorINN] = useState("");
  const [errorScanINN, setErrorScanINN] = useState("");
  const [errorOGRN, setErrorOGRN] = useState("");
  const [errorScanOGRN, setErrorScanOGRN] = useState("");

  const validationTypeOOOForm = useCallback(() => {
    let newErrorNameFull = "";
    let newErrorNameAbbreviated = "";
    let newErrorINN = "";
    let newErrorOGRN = "";
    let newErrorScanINN = "";
    let newErrorScanOGRN = "";
    let newErrorDateRegistration = "";

    if (!nameFull) newErrorNameFull = "Обязательное поле";
    if (!nameAbbreviated) newErrorNameAbbreviated = "Обязательное поле";

    if (!scanINN) {
      newErrorScanINN = "Обязательное поле";
    } else if (
      !["doc", "docx", "pdf", "png", "jpg", "jpeg"].includes(
        scanINN[0].name.split(".").pop()!.toLowerCase()
      )
    ) {
      newErrorScanINN = "формат файла не поддерживается";
    }

    if (!scanOGRN) {
      newErrorScanOGRN = "Обязательное поле";
    } else if (
      !["doc", "docx", "pdf", "png", "jpg", "jpeg"].includes(
        scanOGRN[0].name.split(".").pop()!.toLowerCase()
      )
    ) {
      newErrorScanOGRN = "формат файла не поддерживается";
    }

    if (!iNN) {
      newErrorINN = "Обязательное поле";
    } else if (iNN.length !== 10) {
      newErrorINN = "Код должен содержать 10 цифр";
    }

    if (!oGRN) {
      newErrorOGRN = "Обязательное поле";
    } else if (oGRN.length !== 13) {
      newErrorOGRN = "Код должен содержать 13 цифр";
    }

    if (!dateRegistration) {
      newErrorDateRegistration = "Обязательное поле";
    } else if (dateRegistration.length !== 10) {
      newErrorDateRegistration = "Неполная дата";
    }

    setErrorNameFull(newErrorNameFull);
    setErrorNameAbbreviated(newErrorNameAbbreviated);
    setErrorINN(newErrorINN);
    setErrorScanINN(newErrorScanINN);
    setErrorOGRN(newErrorOGRN);
    setErrorScanOGRN(newErrorScanOGRN);
    setErrorDateRegistration(newErrorDateRegistration);

    const status =
      !newErrorNameFull &&
      !newErrorNameAbbreviated &&
      !newErrorINN &&
      !newErrorOGRN &&
      !newErrorScanINN &&
      !newErrorScanOGRN &&
      !newErrorDateRegistration;

    return status;
  }, [
    dateRegistration,
    iNN,
    nameAbbreviated,
    nameFull,
    oGRN,
    scanINN,
    scanOGRN,
  ]);

  function installValuesFromStore() {
    if (
      checkoutStore.ownershipForm &&
      checkoutStore.ownershipForm.TypeOwnership === "ООО"
    ) {
      const data = checkoutStore.ownershipForm as OOOFormType;
      setnameFull(data.nameFull);
      setNameAbbreviated(data.nameAbbreviated);
      setINN(data.iNN);
      setOGRN(data.oGRN);
      setScanINN(data.scanINN);
      setScanOGRN(data.scanOGRN);
      setDateRegistration(data.dateRegistration);
    }
  }

  function acceptForm() {
    if (validationTypeOOOForm()) {
      if (scanINN && scanOGRN) {
        const dataForm: OOOFormType = {
          TypeOwnership: "ООО",
          nameFull: nameFull,
          nameAbbreviated: nameAbbreviated,
          iNN: iNN,
          oGRN: oGRN,
          scanINN: scanINN,
          scanOGRN: scanOGRN,
          dateRegistration: dateRegistration,
        };

        dispatch(setOwnershipForm(dataForm));
        navigate("/registration-address");
        if (checkoutStore.step === 2) dispatch(nextStep());
      }
    }
  }

  function installValuesFromINNData() {
    if (iNN.length === 10) {
      const data = iNNData[iNN];

      if (data) {
        setNameAbbreviated(data.nameAbbreviated);
        setnameFull(data.nameFull);
        setOGRN(data.oGRN);
        setDateRegistration(data.dateRegistration);
      }
    }
  }

  useEffect(installValuesFromINNData, [iNN]);
  useEffect(installValuesFromStore, []);

  return (
    <div className={classNames({ [styles.formContent_hidden]: isHidden })}>
      <div>
        <div className={classNames(styles.formLine, styles.formLine_31)}>
          <Input
            value={nameFull}
            setValue={setnameFull}
            title="Наименование полное*"
            placeholder="ООО «Московская промышленная компания»"
            errorString={errorNameFull}
          />
          <Input
            value={nameAbbreviated}
            setValue={setNameAbbreviated}
            title="Сокращение*"
            placeholder="ООО «МПК»"
            errorString={errorNameAbbreviated}
          />
        </div>
        <div className={classNames(styles.formLine, styles.formLine_112)}>
          <DateInput
            title="Дата регистрации*"
            value={dateRegistration}
            setValue={setDateRegistration}
            errorString={errorDateRegistration}
          />
          <Input
            value={iNN}
            setValue={setINN}
            maskOption={maskINNOptions}
            errorString={errorINN}
            title="ИНН*"
          />
          <FileInput
            value={scanINN}
            setValue={setScanINN}
            title="Скан ИНН*"
            errorString={errorScanINN}
          />
        </div>
        <div className={classNames(styles.formLine, styles.formLine_121)}>
          <Input
            value={oGRN}
            setValue={setOGRN}
            maskOption={maskOGRNOptions}
            errorString={errorOGRN}
            title="ОГРН*"
          />
          <FileInput
            value={scanOGRN}
            setValue={setScanOGRN}
            title="Скан ОГРН*"
            errorString={errorScanOGRN}
          />
        </div>
      </div>
      <div className={styles.formFooter}>
        <button className={styles.linkButton} onClick={() => navigate("/")}>
          Отмена
        </button>
        <button className={styles.button} onClick={acceptForm}>
          Далее
        </button>
      </div>
    </div>
  );
}
