import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import styles from "./styles.module.scss";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { maskINNOptions, maskOGRNIPOptions } from "src/constants/imask";
import DateInput from "src/components/ui-components/DateInput";
import FileInput from "src/components/ui-components/FileInput";
import Input from "src/components/ui-components/Input";
import Checkbox from "src/components/ui-components/Checkbox";
import { useNavigate } from "react-router-dom";
import { IPFormType } from "src/features/Checkout/types";
import {
  nextStep,
  setOwnershipForm,
} from "src/features/Checkout/store/checkoutSlise";

interface IPFormPropsType {
  isHidden?: boolean;
}

export default function IPForm({ isHidden = true }: IPFormPropsType) {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [dateRegistration, setDateRegistration] = useState("");
  const [iNN, setINN] = useState<string>("");
  const [oGRNIP, setOGRNIP] = useState("");
  const [scanINN, setScanINN] = useState<FileList | null>(null);
  const [scanOGRNIP, setScanOGRNIP] = useState<FileList | null>(null);
  const [scanLeaseContract, setScanLeaseContract] = useState<FileList | null>(
    null
  );
  const [isNotLeaseContract, setIsNotLeaseContract] = useState(false);
  const [scanEGRIP, setScanEGRIP] = useState<FileList | null>(null);

  const [errorINN, setErrorINN] = useState("");
  const [errorOGRNIP, setErrorOGRNIP] = useState("");
  const [errorScanINN, setErrorScanINN] = useState("");
  const [errorScanOGRNIP, setErrorScanOGRNIP] = useState("");
  const [errorScanLeaseContract, setErrorScanLeaseContract] = useState("");
  const [errorScanEGRIP, setErrorScanEGRIP] = useState("");
  const [errorDateRegistration, setErrorDateRegistration] = useState("");

  const validationTypeIPForm = useCallback(() => {
    let newErrorINN = "";
    let newErrorOGRNIP = "";
    let newErrorScanINN = "";
    let newErrorScanOGRNIP = "";
    let newErrorScanLeaseContract = "";
    let newErrorScanEGRIP = "";
    let newErrorDateRegistration = "";

    if (!iNN) {
      newErrorINN = "Обязательное поле";
    } else if (iNN.length !== 10) {
      newErrorINN = "Код должен содержать 10 цифр";
    }

    if (!oGRNIP) {
      newErrorOGRNIP = "Обязательное поле";
    } else if (oGRNIP.length !== 15) {
      newErrorOGRNIP = "Код должен содержать 15 цифр";
    }

    if (!dateRegistration) {
      newErrorDateRegistration = "Обязательное поле";
    } else if (dateRegistration.length !== 10) {
      newErrorDateRegistration = "Неполная дата";
    }

    if (!scanINN) {
      newErrorScanINN = "Обязательное поле";
    } else if (
      !["doc", "docx", "pdf", "png", "jpg", "jpeg"].includes(
        scanINN[0].name.split(".").pop()!.toLowerCase()
      )
    ) {
      newErrorScanINN = "формат файла не поддерживается";
    }

    if (!scanOGRNIP) {
      newErrorScanOGRNIP = "Обязательное поле";
    } else if (
      !["doc", "docx", "pdf", "png", "jpg", "jpeg"].includes(
        scanOGRNIP[0].name.split(".").pop()!.toLowerCase()
      )
    ) {
      newErrorScanOGRNIP = "формат файла не поддерживается";
    }

    if (!scanEGRIP) {
      newErrorScanEGRIP = "Обязательное поле";
    } else if (
      !["doc", "docx", "pdf", "png", "jpg", "jpeg"].includes(
        scanEGRIP[0].name.split(".").pop()!.toLowerCase()
      )
    ) {
      newErrorScanEGRIP = "формат файла не поддерживается";
    }
    if (!isNotLeaseContract && !scanLeaseContract) {
      newErrorScanLeaseContract = "Обязательное поле";
    } else if (
      scanLeaseContract &&
      !isNotLeaseContract &&
      !["doc", "docx", "pdf", "png", "jpg", "jpeg"].includes(
        scanLeaseContract[0].name.split(".").pop()!.toLowerCase()
      )
    ) {
      newErrorScanLeaseContract = "формат файла не поддерживается";
    }

    setErrorINN(newErrorINN);
    setErrorOGRNIP(newErrorOGRNIP);
    setErrorScanINN(newErrorScanINN);
    setErrorScanOGRNIP(newErrorScanOGRNIP);
    setErrorScanLeaseContract(newErrorScanLeaseContract);
    setErrorScanEGRIP(newErrorScanEGRIP);
    setErrorDateRegistration(newErrorDateRegistration);

    const status =
      !newErrorINN &&
      !newErrorOGRNIP &&
      !newErrorScanINN &&
      !newErrorScanOGRNIP &&
      !newErrorScanLeaseContract &&
      !newErrorScanEGRIP &&
      !newErrorDateRegistration;

    return status;
  }, [
    dateRegistration,
    iNN,
    isNotLeaseContract,
    oGRNIP,
    scanEGRIP,
    scanINN,
    scanLeaseContract,
    scanOGRNIP,
  ]);

  function acceptForm() {
    if (validationTypeIPForm()) {
      if (scanINN && scanOGRNIP && scanEGRIP) {
        const dataForm: IPFormType = {
          TypeOwnership: "ИП",
          iNN: iNN,
          oGRNIP: oGRNIP,
          scanINN: scanINN,
          scanOGRNIP: scanOGRNIP,
          scanLeaseContract: isNotLeaseContract ? null : scanLeaseContract,
          scanEGRIP: scanEGRIP,
          dateRegistration: dateRegistration,
        };
        dispatch(setOwnershipForm(dataForm));
        navigate("/registration-address");
        if (checkoutStore.step === 2) dispatch(nextStep());
      }
    }
  }

  function installValuesFromStore() {
    if (
      checkoutStore.ownershipForm &&
      checkoutStore.ownershipForm.TypeOwnership === "ИП"
    ) {
      const data = checkoutStore.ownershipForm as IPFormType;
      setINN(data.iNN);
      setOGRNIP(data.oGRNIP);
      setScanINN(data.scanINN);
      setScanOGRNIP(data.scanOGRNIP);
      setScanEGRIP(data.scanEGRIP);
      setIsNotLeaseContract(!data.scanLeaseContract);
      setScanLeaseContract(data.scanLeaseContract);
      setDateRegistration(data.dateRegistration);
    }
  }

  useEffect(installValuesFromStore, []);

  return (
    <div className={classNames({ [styles.formContent_hidden]: isHidden })}>
      <div>
        <div className={classNames(styles.formLine, styles.formLine_121)}>
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

          <DateInput
            title="Дата регистрации*"
            value={dateRegistration}
            setValue={setDateRegistration}
            errorString={errorDateRegistration}
          />
        </div>
        <div className={styles.formLine}>
          <Input
            value={oGRNIP}
            setValue={setOGRNIP}
            maskOption={maskOGRNIPOptions}
            errorString={errorOGRNIP}
            title="ОГРНИП*"
          />
          <FileInput
            value={scanOGRNIP}
            setValue={setScanOGRNIP}
            title="Скан ОГРНИП*"
            errorString={errorScanOGRNIP}
          />
        </div>
        <div className={styles.formLine}>
          <FileInput
            value={scanLeaseContract}
            setValue={setScanLeaseContract}
            title="Скан договора аренды помещения (офиса)*"
            errorString={errorScanLeaseContract}
            isDisabled={isNotLeaseContract}
          />
          <FileInput
            value={scanEGRIP}
            setValue={setScanEGRIP}
            title="Скан выписки из ЕГРИП (не старше 3 месяцев)*"
            errorString={errorScanEGRIP}
          />
        </div>
        <div className={styles.iPForm__lineCheckbox}>
          <Checkbox
            value={isNotLeaseContract}
            setValue={setIsNotLeaseContract}
            title="Нет договора"
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
