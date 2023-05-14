import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";

export default function Checkout(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);

  useEffect(() => {
    if (location.pathname === "/type-ownership" && checkoutStore.step < 2)
      navigate("/");
    if (location.pathname === "/registration-address" && checkoutStore.step < 3)
      navigate("/");
    if (location.pathname === "/address-residence" && checkoutStore.step < 4)
      navigate("/");
    if (location.pathname === "/social-media" && checkoutStore.step < 5)
      navigate("/");
  }, [checkoutStore.step, location, navigate]);

  return (
    <div className={styles.Checkout}>
      <Header />
      <main className={styles.Checkout__main}>
        <div className={styles.Checkout__content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
