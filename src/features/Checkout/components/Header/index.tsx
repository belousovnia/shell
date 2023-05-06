import styles from "./styles.module.scss";
import NavItem from "src/components/ui-components/NavItem";
import { useLocation } from "react-router-dom";
import { paths } from "src/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { nextStep } from "src/features/Checkout/store/checkoutSlise";

export default function Header() {
  const location = useLocation();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const dispatch = useDispatch();

  console.log(checkoutStore.step);

  return (
    <div className={styles.header}>
      <button onClick={() => dispatch(nextStep())}>+1</button>
      <h1 className={styles.title}>Создание аккаунта</h1>
      <p className={styles.subtitle}>
        Заполните все пункты данной формы и нажмите кнопку «Сохранить».
      </p>
      <nav className={styles.navBlock}>
        <NavItem number={1} link={paths.origin}>
          Общие
        </NavItem>
        <NavItem number={2} link={paths.children["type-ownership"]}>
          Форма собственности
        </NavItem>
        <NavItem number={3} link={paths.children["registration-address"]}>
          Адрес регистрации
        </NavItem>
        <NavItem number={4} link={paths.children["address-residence"]}>
          Адрес проживания
        </NavItem>
        <NavItem number={5} link={paths.children["social-media"]}>
          Социальные сети
        </NavItem>
      </nav>
    </div>
  );
}
