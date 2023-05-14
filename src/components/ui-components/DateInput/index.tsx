import styles from "./styles.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import IMask, { InputMask } from "imask";

interface DateInputPropsType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errorString?: string;
  title?: string;
  isDisabled?: boolean;
}

export default function DateInput({
  setValue,
  value,
  errorString = "",
  title = "",
  isDisabled = false,
}: DateInputPropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mask, setMask] = useState<InputMask<any> | null>(null);

  useEffect(() => {
    if (inputRef.current)
      setMask(
        IMask(inputRef.current, {
          mask: Date,
          min: new Date(1900, 0, 1),
          max: new Date(),
        })
      );
    return () => {
      mask?.destroy();
    };
  }, []);

  useEffect(() => {
    if (mask && value !== mask.value) {
      mask.value = value;
      mask.updateValue();
    }
  }, [mask, value]);

  return (
    <div className={styles.inputBlock}>
      <h2 className={styles.inputTitle}>{title}</h2>
      <input
        ref={inputRef}
        className={classNames(styles.input, {
          [styles.input_error]: errorString,
        })}
        onChange={(i) => setValue(i.currentTarget.value)}
        placeholder="__ . __ . ____"
        disabled={isDisabled}
      />
      {errorString && <p className={styles.textError}>{errorString}</p>}
    </div>
  );
}
