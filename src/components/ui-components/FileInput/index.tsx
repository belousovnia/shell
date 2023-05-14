import styles from "./styles.module.scss";
import classNames from "classnames";
import { HandySvg } from "handy-svg";
import iconDownload from "src/assets/images/iconDownload.svg";
import iconCheckMark from "src/assets/images/iconCheckMark.svg";
import iconCross from "src/assets/images/iconCross.svg";
import { useCallback, useState } from "react";

interface FileInputPropsType {
  title?: string;
  errorString?: string;
  placeholder?: string;
  value: FileList | null;
  setValue: React.Dispatch<React.SetStateAction<FileList | null>>;
  isDisabled?: boolean;
}

export default function FileInput({
  value,
  title = "",
  errorString = "",
  placeholder = "Выберите файл",
  isDisabled = false,
  setValue,
}: FileInputPropsType) {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files.length === 1) {
        const file = e.dataTransfer.files[0];
        setValue(e.dataTransfer.files);
      } else {
        console.log("Only one file can be uploaded at a time");
      }
    },
    [setValue]
  );

  return (
    <div className={styles.inputBlock}>
      <h2 className={styles.inputTitle}>{title}</h2>
      <div className={styles.fileInput__wrapper}>
        <label
          className={classNames(styles.fileInput__label, {
            [styles.fileInput__label_error]: errorString,
            [styles.fileInput__label_disabled]: isDisabled,
          })}
          id="fileInput__label"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            name="file"
            className={styles.fileInput__input}
            onChange={(i) => setValue(i.currentTarget.files)}
            accept=".doc,.docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document .rtf .png, .jpg, .jpeg, .pdf"
            disabled={isDisabled}
          />

          <div
            className={classNames(styles.fileInput__title, {
              [styles.fileInput__title_selected]: value,
              [styles.fileInput__title_error]: errorString,
            })}
          >
            <div className={styles.fileInput__titleWrapper}>
              <HandySvg
                src={iconCheckMark}
                className={classNames(styles.fileInput__iconCheckMark, {
                  [styles.fileInput__iconCheckMark_off]: !value,
                })}
              />
              {value ? value[0].name : placeholder}
            </div>

            <button
              className={classNames(styles.fileInput__buttonCross, {
                [styles.fileInput__buttonCross_off]: !value,
              })}
              onClick={(e) => {
                setValue(null);
              }}
            >
              <HandySvg
                src={iconCross}
                className={styles.fileInput__iconCross}
              />
            </button>
          </div>
          <div
            className={classNames(styles.fileInput__button, {
              [styles.fileInput__button_off]: value,
            })}
          >
            <HandySvg
              src={iconDownload}
              className={styles.fileInput__iconButton}
            />
          </div>
        </label>
      </div>
      <p className={styles.textError}>{errorString}</p>
    </div>
  );
}
