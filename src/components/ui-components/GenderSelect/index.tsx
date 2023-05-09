import styles from "./styles.module.scss";
import { HandySvg } from "handy-svg";
import iconMan from "src/assets/images/iconMan.svg";
import iconWoman from "src/assets/images/iconWoman.svg";

interface GenderSelectPropsType {
  setValue: React.Dispatch<React.SetStateAction<any>>;
  value: "man" | "woman";
}

export default function GenderSelect({
  setValue,
  value,
}: GenderSelectPropsType) {
  return (
    <div className={styles.genderSelect}>
      <div className={styles.container}>
        <input
          id="genderSelect_man"
          name="gender"
          type="radio"
          className={styles.input}
          onChange={() => setValue("man")}
          checked={value === "man"}
        />
        <label className={styles.label} htmlFor="genderSelect_man">
          <HandySvg src={iconMan} />
          <div>М</div>
        </label>
      </div>
      <div className={styles.container}>
        <input
          name="gender"
          type="radio"
          id="genderSelect_woman"
          className={styles.input}
          onChange={() => setValue("woman")}
          checked={value === "woman"}
        />
        <label htmlFor="genderSelect_woman" className={styles.label}>
          <HandySvg src={iconWoman} />
          <div>Ж</div>
        </label>
      </div>
    </div>
  );
}
