export const maskNameOptions = {
  mask: /^[a-zA-Zа-яёА-ЯЁ\s-]{0,32}$/gm,
};

export const maskAddress = {
  mask: /^\d{0,4}$/gm,
};

export const maskINNOptions = {
  mask: "0000000000",
  lazy: false,
  placeholderChar: "x",
};

export const maskOGRNIPOptions = {
  mask: "000000000000000",
  lazy: false,
  placeholderChar: "x",
};

export const maskOGRNOptions = {
  mask: "0000000000000",
  lazy: false,
  placeholderChar: "x",
};
