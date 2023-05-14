import { HandySvg } from "handy-svg";
import styles from "./styles.module.scss";
import iconSocialMedia from "src/assets/images/iconSocialMedia.svg";
import SelectSocialMedia from "src/components/ui-components/SelectSocialMedia";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { SocialMediaItemType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setSocialMediaForm } from "../../store/checkoutSlise";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";

const emptySocialMediaItem = { name: "", src: "" };

export default function SocialMediaForm() {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state: RootState) => state.checkoutStore);
  const navigate = useNavigate();

  const [socialMediaList, setSocialMediaList] = useState<SocialMediaItemType[]>(
    [emptySocialMediaItem]
  );
  const [errorList, setErrorList] = useState<Number[]>([]);

  const validationForm = useCallback(() => {
    const newErrorList = socialMediaList.reduce(
      (accumulator, currentValue, index) => {
        if (!currentValue.name || !currentValue.src)
          return [...accumulator, index];
        return accumulator;
      },
      [] as Number[]
    );

    setErrorList(newErrorList);
    return newErrorList.length === 0;
  }, [socialMediaList]);

  function acceptForm() {
    if (validationForm()) {
      dispatch(setSocialMediaForm(socialMediaList));
      alert("Все формы успешно заполнены!");
    }
  }

  useEffect(() => {
    if (checkoutStore.socialMediaForm)
      setSocialMediaList(checkoutStore.socialMediaForm);
  }, []);

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <HandySvg src={iconSocialMedia} className={styles.icon} />
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>Социальные сети</h1>
          <p className={styles.subtitle}>
            Введите свои действуйющие ссылки на социальные сети и количество
            подписчиков.
          </p>
        </div>

        {socialMediaList.map((element, index) => (
          <SelectSocialMedia
            key={`SelectSocialMedia${index}`}
            value={socialMediaList[index]}
            setValue={(newValue) => {
              const newList: SocialMediaItemType[] = [...socialMediaList];
              newList[index] = newValue;
              setSocialMediaList(newList);
            }}
            errorString={
              errorList.indexOf(index) === -1
                ? ""
                : "Укажите соцсеть и ссылку на нее"
            }
            onDelete={
              socialMediaList.length > 1
                ? () => {
                    setSocialMediaList(
                      socialMediaList.filter(
                        (item, indexItem) => indexItem !== index
                      )
                    );
                  }
                : undefined
            }
          />
        ))}
        <button
          className={classNames(
            styles.linkButton,
            styles.socialMediaForm__buttonAdd
          )}
          onClick={() =>
            setSocialMediaList([...socialMediaList, emptySocialMediaItem])
          }
        >
          <div className={styles.socialMediaForm__buttonAddPlus}>+</div>
          Добавить социальную сеть
        </button>
      </div>
      <div className={styles.formFooter}>
        <button
          className={styles.linkButton}
          onClick={() => navigate("/address-residence")}
        >
          Отмена
        </button>
        <button
          className={styles.button}
          onClick={() => {
            acceptForm();
          }}
        >
          Далее
        </button>
      </div>
    </div>
  );
}
