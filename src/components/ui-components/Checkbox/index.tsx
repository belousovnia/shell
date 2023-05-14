import styles from "./styles.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import IMask, { InputMask } from "imask";

interface CheckboxPropsType {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  isError?: boolean;
  isDisabled?: boolean;
}

export default function Checkbox({
  setValue,
  value,
  title = "",
  isError = false,
  isDisabled = false,
}: CheckboxPropsType) {
  return (
    <div className={styles.checkbox}>
      <label
        className={classNames(styles.checkbox__label, {
          [styles.checkbox__label_check]: value,
          [styles.checkbox__label_error]: isError,
          [styles.checkbox__label_disabled]: isDisabled,
        })}
      >
        <input
          className={styles.checkbox__input}
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.currentTarget.checked)}
        />
        {value && "✓"}
      </label>
      <h2
        className={classNames(styles.checkbox__title, {
          [styles.checkbox__title_error]: isError && !value,
        })}
      >
        {" "}
        {title}
      </h2>
    </div>
  );
}
