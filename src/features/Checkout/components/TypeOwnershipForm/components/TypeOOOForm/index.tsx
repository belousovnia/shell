import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import styles from "./styles.module.scss";
import iconTypeOwnershipForm from "src/assets/images/iconTypeOwnershipForm.svg";
import { HandySvg } from "handy-svg";
import { useState } from "react";
import Select from "src/components/ui-components/Select";

export default function TypeOwnershipForm() {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [typeActivity, setTypeActivity] = useState<"ИП" | "ООО" | null>(null);

  const [errorTypeActivity, setErrorTypeActivity] = useState("");

  return <div className={styles.form}></div>;
}
