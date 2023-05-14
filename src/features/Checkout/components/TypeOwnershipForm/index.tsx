import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import styles from "./styles.module.scss";
import iconTypeOwnershipForm from "src/assets/images/iconTypeOwnershipForm.svg";
import { HandySvg } from "handy-svg";
import { useEffect, useState } from "react";
import Select from "src/components/ui-components/Select";
import IPForm from "./components/IPForm";
import OOOForm from "./components/OOOForm";

export default function TypeOwnershipForm() {
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [typeActivity, setTypeActivity] = useState<"ИП" | "ООО" | null>(null);

  useEffect(() => {
    if (checkoutStore.ownershipForm)
      setTypeActivity(checkoutStore.ownershipForm.TypeOwnership);
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <HandySvg src={iconTypeOwnershipForm} className={styles.icon} />
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>Форма собственности</h1>
          <p className={styles.subtitle}>Введите свои персональные данные.</p>
        </div>
        <div className={styles.inputBlock}>
          <h2 className={styles.inputTitle}>Вид деятельности*</h2>
          <Select
            value={typeActivity}
            setValue={setTypeActivity}
            options={[
              { label: "Индивидуальный предприниматель (ИП)", value: "ИП" },
              {
                label: "Общество с ограниченной ответственностью (ООО)",
                value: "ООО",
              },
            ]}
            placeholder="выбрать"
          />
        </div>

        <IPForm isHidden={typeActivity !== "ИП"} />
        <OOOForm isHidden={typeActivity !== "ООО"} />
      </div>
      {typeActivity === null && (
        <div className={styles.formFooter}>
          <button className={styles.linkButton} onClick={() => navigate("/")}>
            Отмена
          </button>
          <button className={styles.button} disabled={true}>
            Далее
          </button>
        </div>
      )}
    </div>
  );
}
