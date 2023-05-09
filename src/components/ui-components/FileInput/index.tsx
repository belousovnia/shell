import styles from "./styles.module.scss";
import classNames from "classnames";

interface FileInputPropsType {
  isError?: boolean;
}

export default function FileInput({ isError = false }: FileInputPropsType) {
  return (
    <div className={styles.fileInput__wrapper}>
      <input
        type="file"
        name="file"
        id="fileInput"
        className={styles.fileInput__input}
      />
      <label className={styles.fileInput__label} htmlFor="fileInput">
        <div className={styles.fileInput__title}>Файл не вбран</div>
        <div className={styles.fileInput__button}>Выбрать</div>
      </label>
    </div>
  );
}
