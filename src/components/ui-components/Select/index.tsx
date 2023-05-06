import React, { useState, useRef } from "react";
import useOutsideClick from "src/hooks/useOutsideClick";
import PerfectScrollbar from "react-perfect-scrollbar";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface Option {
  value: string | number;
  label?: string | number;
}

interface SelectPropsType {
  value: string | number | null;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
}

export default function Select({
  value,
  setValue,
  options,
  disabled,
  placeholder,
  error = false,
}: SelectPropsType) {
  const [isOpened, setIsOpened] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string | number) => {
    setValue(value);
    setIsOpened(false);
  };

  useOutsideClick(elementRef, () => {
    if (isOpened) setIsOpened(false);
  });

  return (
    <div className={styles.select} ref={elementRef}>
      <input
        className={classNames(styles.input, {
          [styles.input_error]: error,
        })}
        onClick={() => setIsOpened(!isOpened)}
        value={
          options.find((option) => option.value === value)?.label || value || ""
        }
        readOnly
        disabled={disabled}
        placeholder={placeholder}
      />

      {isOpened && (
        <PerfectScrollbar
          className={styles.modalSelect}
          options={{
            wheelPropagation: false,
            useBothWheelAxes: false,
            suppressScrollX: true,
            swipeEasing: true,
          }}
        >
          <div>
            {options.map((option) => (
              <div
                className={styles.option}
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label || option.value}
              </div>
            ))}
          </div>
        </PerfectScrollbar>
      )}
    </div>
  );
}
