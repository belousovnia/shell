import React, { useState, useRef } from "react";
import useOutsideClick from "src/hooks/useOutsideClick";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { HandySvg } from "handy-svg";
import arrowIcon from "src/assets/images/arrowIcon.svg";

export interface OptionSelectType {
  value: string | number;
  label?: string | number;
}

interface SelectPropsType {
  value: string | number | null;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  options: OptionSelectType[];
  isDisabled?: boolean;
  placeholder?: string;
  errorString?: string;
  title?: string;
  className?: string;
}

export default function Select({
  value,
  setValue,
  options,
  isDisabled = false,
  placeholder,
  errorString = "",
  title = "",
  className = "",
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
    <div className={classNames(styles.inputBlock, className)}>
      {title && <h2 className={styles.inputTitle}>{title}</h2>}
      <div className={styles.select} ref={elementRef}>
        <div className={styles.wrapperInput}>
          <input
            className={classNames(styles.input, {
              [styles.input_error]: errorString,
              [styles.input_open]: isOpened,
            })}
            onClick={() => setIsOpened(!isOpened)}
            value={
              options.find((option) => option.value === value)?.label ||
              value ||
              ""
            }
            readOnly
            disabled={isDisabled}
            placeholder={placeholder}
          />
          <HandySvg
            src={arrowIcon}
            className={classNames(styles.arrow, {
              [styles.arrow_open]: isOpened,
            })}
          />
        </div>

        {isOpened && (
          <div className={styles.modalSelect}>
            <div>
              {(() => {
                if (options.length === 0) {
                  return (
                    <div
                      className={styles.option}
                      key={"styles.option"}
                      onClick={() => handleOptionClick("")}
                    >
                      -
                    </div>
                  );
                } else {
                  return options.map((option) => (
                    <div
                      className={styles.option}
                      key={option.value}
                      onClick={() => handleOptionClick(option.value)}
                    >
                      {option.label || option.value}
                    </div>
                  ));
                }
              })()}
            </div>
          </div>
        )}
      </div>
      {errorString && <p className={styles.textError}>{errorString}</p>}
    </div>
  );
}
