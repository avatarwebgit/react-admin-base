const numberFormat = (value, locale = "fa-IR") => {

    if (!value) return "";
  return new Intl.NumberFormat(locale).format(value);
};

export default numberFormat;
