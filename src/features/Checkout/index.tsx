import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import styles from "./styles.module.scss";

export default function Checkout() {
  return (
    <div className={styles.Checkout}>
      <Header />
      <main className={styles.Checkout__main}>
        <Outlet />
      </main>
    </div>
  );
}
