const DateToEN = (value: string): string =>
  value.split('/').reverse().join('-');

const DateToPTBR = (value: string): string =>
  value.split('-').reverse().join('/');

const EncodedBase64Image = (value: string): string =>
  `data:image/gif;base64,${value}`;

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

const onlyNumbers = (value: string): string => {
  return value.replace(/\D/g, '');
};

export { DateToEN, DateToPTBR, EncodedBase64Image, classNames, onlyNumbers };
