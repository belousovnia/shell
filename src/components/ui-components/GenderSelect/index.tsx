import styles from "./styles.module.scss";
import { HandySvg } from "handy-svg";
import iconMan from "src/assets/images/iconMan.svg";
import iconWoman from "src/assets/images/iconWoman.svg";

interface GenderSelectPropsType {
  setValue: React.Dispatch<React.SetStateAction<any>>;
  value: "man" | "woman";
  title?: string;
}

export default function GenderSelect({
  setValue,
  value,
  title = "",
}: GenderSelectPropsType) {
  return (
    <div className={styles.inputBlock}>
      <h2 className={styles.inputTitle}>{title}</h2>
      <div className={styles.genderSelect}>
        <div className={styles.genderSelect__container}>
          <input
            id="genderSelect_man"
            name="gender"
            type="radio"
            className={styles.genderSelect__inputRadio}
            onChange={() => setValue("man")}
            checked={value === "man"}
          />
          <label
            className={styles.genderSelect__label}
            htmlFor="genderSelect_man"
          >
            <HandySvg src={iconMan} />
            <div>М</div>
          </label>
        </div>
        <div className={styles.genderSelect__container}>
          <input
            name="gender"
            type="radio"
            id="genderSelect_woman"
            className={styles.genderSelect__inputRadio}
            onChange={() => setValue("woman")}
            checked={value === "woman"}
          />
          <label
            htmlFor="genderSelect_woman"
            className={styles.genderSelect__label}
          >
            <HandySvg src={iconWoman} />
            <div>Ж</div>
          </label>
        </div>
      </div>
    </div>
  );
}
