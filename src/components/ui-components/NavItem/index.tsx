import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface NavItemPropsType {
  children?: React.ReactNode;
  number?: number;
  link?: string;
}

export default function NavItem({
  number = 1,
  children = "",
  link = "/",
}: NavItemPropsType) {
  const location = useLocation();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);

  return (
    <div
      className={classNames(styles.navItem, {
        [styles.navItemComplete]: link === location.pathname,
      })}
    >
      <div className={styles.number}>
        <div
          className={classNames(styles.circle, {
            [styles.circleActive]:
              link === location.pathname || checkoutStore.step > number,
          })}
        >
          {number}
        </div>
        <div className={styles.line}></div>
      </div>
      <Link to={link} className={styles.link}>
        {children}
        <div
          className={classNames(styles.checkMark, {
            [styles.off]: checkoutStore.step <= number,
          })}
        >
          ✓
        </div>
      </Link>
    </div>
  );
}
