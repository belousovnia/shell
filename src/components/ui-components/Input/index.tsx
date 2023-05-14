import styles from "./styles.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import IMask, { InputMask } from "imask";

interface InputPropsType {
  value: string;
  setValue: (i: string) => void;
  errorString?: string;
  title?: string;
  maskOption?: IMask.AnyMaskedOptions | null;
  placeholder?: string;
  isGetUnmaskedValue?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export default function Input({
  setValue,
  value,
  errorString = "",
  title = "",
  placeholder = "",
  isDisabled = false,
  maskOption = null,
  isGetUnmaskedValue = true,
  className = "",
}: InputPropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mask, setMask] = useState<InputMask<any> | null>(null);

  useEffect(() => {
    if (inputRef.current && maskOption)
      setMask(IMask(inputRef.current, maskOption));
    return () => {
      mask?.destroy();
    };
  }, [maskOption]);

  useEffect(() => {
    if (
      mask &&
      value !== (isGetUnmaskedValue ? mask.unmaskedValue : mask.value)
    ) {
      isGetUnmaskedValue ? (mask.unmaskedValue = value) : (mask.value = value);
      mask.updateValue();
    } else if (inputRef.current && !maskOption) {
      inputRef.current.value = value;
    }
  }, [isGetUnmaskedValue, mask, value]);

  return (
    <div className={classNames(styles.inputBlock, className)}>
      {title && <h2 className={styles.inputTitle}>{title}</h2>}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className={classNames(styles.input, {
          [styles.input_error]: errorString,
          [styles.input_empty]: maskOption && !value,
        })}
        onInput={(i) =>
          setValue(
            isGetUnmaskedValue && mask
              ? mask.unmaskedValue
              : i.currentTarget.value
          )
        }
        disabled={isDisabled}
      />
      {errorString && <p className={styles.textError}>{errorString}</p>}
    </div>
  );
}
