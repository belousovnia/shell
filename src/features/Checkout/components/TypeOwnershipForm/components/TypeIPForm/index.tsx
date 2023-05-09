import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import styles from "./styles.module.scss";
import iconTypeOwnershipForm from "src/assets/images/iconTypeOwnershipForm.svg";
import { HandySvg } from "handy-svg";
import { useEffect, useRef, useState } from "react";
import Select from "src/components/ui-components/Select";
import classNames from "classnames";
import IMask, { InputMask } from "imask";
import { maskINNOptions } from "src/constants/imask";
import DateInput from "src/components/ui-components/DateInput";
import FileInput from "src/components/ui-components/FileInput";

interface TypeIPFormPropsType {
  isHidden?: boolean;
}

export default function TypeIPForm({ isHidden = true }: TypeIPFormPropsType) {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);

  const [dateRegistration, setDateRegistration] = useState("");
  const [errorDateRegistration, setErrorDateRegistration] = useState("");

  const INNInputRef = useRef<HTMLInputElement>(null);
  const [maskINN, setMaskINN] = useState<InputMask<any> | null>(null);
  const [errorINN, setErrorINN] = useState("");

  useEffect(() => {
    if (INNInputRef.current)
      setMaskINN(IMask(INNInputRef.current, maskINNOptions));

    return () => {
      maskINN?.destroy();
    };
  }, []);

  return (
    <div className={classNames({ [styles.formContent_hidden]: !isHidden })}>
      <div className={styles.formTripleLine}>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>ИНН*</h2>
          <input
            ref={INNInputRef}
            type="text"
            className={classNames(styles.input, {
              [styles.input_error]: errorINN,
            })}
          />
          <p className={styles.textError}>{errorINN}</p>
        </div>

        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Скан ИНН*</h2>
          <FileInput />
        </div>

        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Дата регистрации*</h2>
          <DateInput
            value={dateRegistration}
            setValue={setDateRegistration}
            isError={!!errorDateRegistration}
          />
          <p className={styles.textError}>{errorDateRegistration}</p>
        </div>
      </div>
    </div>
  );
}
