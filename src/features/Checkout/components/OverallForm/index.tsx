import { HandySvg } from "handy-svg";
import styles from "./styles.module.scss";
import iconOverallForm from "src/assets/images/iconOverallForm.svg";
import Select from "src/components/ui-components/Select";

export default function OverallForm() {
  return (
    <div className={styles.form}>
      <HandySvg src={iconOverallForm} className={styles.icon} />
      <div className={styles.headerBlock}>
        <h1 className={styles.title}>Общие</h1>
        <p className={styles.subtitle}>Введите свои персональные данные.</p>
      </div>{" "}
      <div className={styles.formLine}>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Фамилия*</h2>
          <input type="text" placeholder="Васильев" className={styles.input} />
        </div>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Имя*</h2>
          <input placeholder="Иван" type="text" className={styles.input} />
        </div>
      </div>
      <div className={styles.formLine}>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Отчество*</h2>
          <input type="text" placeholder="Сергеевич" className={styles.input} />
        </div>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Имя*</h2>
          {/* <Select /> */}
        </div>
      </div>
    </div>
  );
}
