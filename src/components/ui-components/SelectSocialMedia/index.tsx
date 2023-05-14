import React, { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { HandySvg } from "handy-svg";
import Select from "../Select";
import { SocialMediaData } from "src/constants/data";
import Input from "../Input";
import iconCross from "src/assets/images/iconCross.svg";
import { SocialMediaItemType } from "src/features/Checkout/types";

interface SelectSocialMediaPropsType {
  value: SocialMediaItemType;
  setValue: (i: SocialMediaItemType) => void;
  onDelete?: () => void;
  errorString?: string;
}

export default function SelectSocialMedia({
  setValue,
  value,
  onDelete,
  errorString = "",
}: SelectSocialMediaPropsType) {
  const [srcPlaceholder, setSrcPlaceholder] = useState("");

  return (
    <div className={styles.selectSocialMedia}>
      <h2 className={styles.inputTitle}>{"Сайт / Приложение*"}</h2>
      <div className={styles.selectSocialMedia__container}>
        <Select
          placeholder="Выбрать"
          value={value.name}
          setValue={(newValue) => {
            const newSocialMedia = SocialMediaData.find(
              (i) => i.value === newValue
            );
            setSrcPlaceholder(newSocialMedia ? newSocialMedia.simpleSrs : "");
            setValue({ name: newValue, src: value.src });
          }}
          options={SocialMediaData}
          className={styles.selectSocialMedia__select}
        />
        {value.name && (
          <Input
            className={styles.selectSocialMedia__input}
            value={value.src}
            setValue={(newValue) => {
              setValue({ name: value.name, src: newValue });
            }}
            placeholder={srcPlaceholder}
          />
        )}
        {value.name && onDelete && (
          <button
            className={styles.selectSocialMedia__crossButton}
            onClick={onDelete}
          >
            <HandySvg
              src={iconCross}
              className={styles.selectSocialMedia__cross}
            />
          </button>
        )}
      </div>
      {errorString && <p className={styles.textError}>{errorString}</p>}
    </div>
  );
}
