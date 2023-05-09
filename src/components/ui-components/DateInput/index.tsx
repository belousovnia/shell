import styles from "./styles.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import IMask, { InputMask } from "imask";

interface DateInputPropsType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  isError?: boolean;
}

export default function DateInput({
  setValue,
  value,
  isError = false,
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

  return (
    <input
      ref={inputRef}
      className={classNames(styles.input, {
        [styles.input_error]: isError,
      })}
      value={value}
      onInput={(i) => setValue(i.currentTarget.value)}
      placeholder="__ . __ . ____"
    ></input>
  );
}
