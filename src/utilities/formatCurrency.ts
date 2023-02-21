const FORMATER_CURRENCY = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "UAH",
});

export const formatCurrency = (number: number) => {
  return FORMATER_CURRENCY.format(number);
};
