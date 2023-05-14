export const operatingСities = [
  { value: "Москва" },
  { value: "Санкт-Петербург" },
];

export const citizenship = [
  { value: "Россия" },
  { value: "Казахстан" },
  { value: "Беларусь" },
  { value: "Иное" },
];

export const placeRegistration = [
  {
    value: "Россия",
    region: [
      { value: "Московская область" },
      { value: "Амурская область" },
      { value: "Алтайский край" },
      { value: "Республика Алтай" },
      { value: "Самарская область" },
    ],
  },
  {
    value: "Казахстан",
    region: [
      { value: "Акмолинская область" },
      { value: "Туркестанская область" },
      { value: "Жамбылская область" },
      { value: "Карагандинская область" },
      { value: "Кызылординская область" },
    ],
  },
  {
    value: "Беларусь",
    region: [
      { value: "Брестская область" },
      { value: "Гомельская область" },
      { value: "Минская область" },
    ],
  },
];

export const SocialMediaData = [
  {
    value: "ВКонтакте",
    simpleSrs: "vk.com/example",
  },
  {
    value: "YouTube",
    simpleSrs: "youtube.com/example",
  },
  {
    value: "Одноклассники",
    simpleSrs: "ok.ru/example",
  },
  {
    value: "Telegram",
    simpleSrs: "t.me/example",
  },
];

export interface INNDataType {
  [id: string]: {
    nameFull: string;
    nameAbbreviated: string;
    oGRN: string;
    dateRegistration: string;
  };
}

export const iNNData: INNDataType = {
  "1111111111": {
    nameFull: "ООО Газ транс кач",
    nameAbbreviated: "ГТЧ",
    oGRN: "1234567890123",
    dateRegistration: "11.11.1999",
  },
  "2222222222": {
    nameFull: "ООО Быстрые перевозки грузов",
    nameAbbreviated: "ТПР",
    oGRN: "1111111111111",
    dateRegistration: "11.10.2001",
  },
  "1234567890": {
    nameFull: "ООО Злобинцкий дизайн студия",
    nameAbbreviated: "ЗДС",
    oGRN: "0000000011223",
    dateRegistration: "22.08.2007",
  },
};
