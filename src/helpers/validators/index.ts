// eslint-disable @typescript-eslint/ban-types
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { uniq } from 'ramda';
import { isPhone, isCPFOrCNPJ } from 'brazilian-values';
import { isValid as isValidCep } from '../masks/cep';
import { isValid as isValidCpf } from '../masks/cpf';
import { isValid as isValidCnpj } from '../masks/cnpj';
import { isValid as isValidRG } from '../masks/rg';
import { isValid as isValidGeneralDate } from '../masks/generalDate';
import { isValid as isValidCardNumber } from '../masks/cardNumber';
import { DateToEN } from '../common';
import { toString } from '../common/amount';

type ValidatorInputType = string;
type ValidatorReturnType = string | false;

dayjs.extend(isSameOrAfter);

const cep = (value: ValidatorInputType): ValidatorReturnType =>
  isValidCep(value) ? false : 'CEP inválido';

function cpf(value: ValidatorInputType): string | false {
  const valid = isValidCpf(value);

  return valid ? false : 'CPF inválido';
}

function cpforcnpj(value: ValidatorInputType): string | false {
  const valid = isCPFOrCNPJ(value);

  return valid ? false : 'CPF/CNPJ inválido';
}

const cnpj = (value: ValidatorInputType): string | false => {
  const valid = isValidCnpj(value);

  return valid ? false : 'CNPJ inválido';
};

const rg = (value: ValidatorInputType): string | false => {
  const valid = isValidRG(value);

  return valid ? false : 'RG inválido';
};

const email = (value: ValidatorInputType): string | false => {
  // eslint-disable-next-line max-len
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = emailRegex.test(String(value).toLowerCase());

  return isValid ? false : 'Email inválido';
};

const required = (value = ''): string | false =>
  value.replace(/[^0-9a-zA-Z]/g, '') ? false : 'Campo obrigatório';

const minLength =
  (length: number) =>
  (value: ValidatorInputType): string | false => {
    const rawValue = value.replace(/[^0-9a-zA-Z]/g, '');

    return rawValue.length < length
      ? `Campo deverá possuir pelo menos ${length} caracteres`
      : false;
  };

const maxLength =
  (length: number) =>
  (value: ValidatorInputType): string | false => {
    const rawValue = value.replace(/[^0-9a-zA-Z]/g, '');

    return rawValue.length > length
      ? `Campo deverá possuir no máximo ${length} caracteres`
      : false;
  };

const between =
  (min: number, max: number) =>
  (data: ValidatorInputType): ValidatorReturnType => {
    const value = Number(data);

    return value < min || value > max ? 'Campo inválido' : false;
  };

const fullname = (value = ''): ValidatorReturnType => {
  const names = value.split(' ').filter((name) => name !== '');

  if (names.length < 2) {
    return 'Nome está incompleto. Digite o nome e sobrenome.';
  }

  return false;
};

const birthday = (value: ValidatorInputType): ValidatorReturnType => {
  const rawValue = value.replace(/[^0-9a-zA-Z]/g, '');

  if (!isValidGeneralDate(value)) return 'Data inválida';
  const date = dayjs(DateToEN(value), 'DD/MM/YYYY');

  if (rawValue.length < 8 || !date.isValid()) {
    return 'Data inválida';
  }

  if (value.trim().length > 10) {
    return 'Data inválida';
  }

  return false;
};

const pastDate = (value: ValidatorInputType): ValidatorReturnType => {
  const rawValue = value.replace(/[^0-9a-zA-Z]/g, '');
  if (value.length < 10) return 'Data inválida';
  const date = dayjs(DateToEN(value), 'DD/MM/YYYY');
  const today = dayjs();

  if (rawValue.length < 8 || !date.isValid() || today.diff(date, 'days') <= 0) {
    return 'Data inválida';
  }

  return false;
};

const greaterThanOrEqual =
  (n: number) =>
  (value: ValidatorInputType): ValidatorReturnType => {
    const valueNumber = parseInt(value, 10);
    return valueNumber < n ? `Valor mínimo R$ ${toString(n)}` : false;
  };

const cardNumber = (value: ValidatorInputType): ValidatorReturnType => {
  const valid = isValidCardNumber(value);

  return valid
    ? false
    : 'Ops, número do cartão incorreto! Tem certeza de que digitou corretamente? Dá uma olhadinha! 🤓';
};

const cardExpirationDate = (value: ValidatorInputType): ValidatorReturnType => {
  const split = value.split('/');
  if (split.length !== 2) {
    return 'Data inválida.';
  }
  if (split[0].length !== 2) {
    return 'Mês inválido.';
  }
  if (split[1].length !== 2 && split[1].length !== 4) {
    return 'Data inválida.';
  }

  if (split[1].length === 2) {
    split[1] = `20${split[1]}`;
  }

  const d = new Date(Number(split[1]), Number(split[0]) - 1, 1);
  const date = dayjs(d);
  const valid = date.isValid() && date.isSameOrAfter(dayjs(), 'month');

  return valid ? false : 'Data inválida.';
};

const mobilePhone = (value: ValidatorInputType): ValidatorReturnType => {
  const valid = isPhone(value);

  return valid ? false : 'Número de celular inválido!';
};

const isEqualToZero = (value: ValidatorInputType): ValidatorReturnType =>
  value === '0' ? 'Campo obrigatório' : false;

const isDateLessThanCurrentDate = (
  value: ValidatorInputType
): ValidatorReturnType => {
  const date = dayjs(value, 'DD/MM/YYYY');
  const valid = date.isValid() && date.isSameOrAfter(dayjs());

  return valid ? false : 'Data informada não pode ser inferior ao dia de hoje.';
};

const validDate = (value: ValidatorInputType): string | false => {
  // eslint-disable-next-line max-len
  const dateRegex =
    /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;

  const isValid = dateRegex.test(String(value).toLowerCase());

  return isValid ? false : 'Data inválida';
};
const isNumeric = (value: ValidatorInputType): ValidatorReturnType =>
  Number.isNaN(Number(value)) ? 'Valor deve ser númerico!' : false;

const isChecked = (value: ValidatorInputType): ValidatorReturnType =>
  typeof value === 'boolean' ? 'Valor deve ser selecionado!' : false;

// eslint-disable @typescript-eslint/ban-types
const applyUnmask =
  (validator: Function, unmask: Function) =>
  (value: ValidatorInputType): ValidatorReturnType =>
    validator(unmask(value));

const hasAbbreviatedNames = (
  value: ValidatorInputType
): ValidatorReturnType => {
  const shortNames = value.split(' ').filter((name) => name.length === 1);

  if (shortNames.length === 0) {
    return false;
  }
  return 'Seu nome não pode estar abreviado.';
};

const hasDuplicateNames = (value: ValidatorInputType): ValidatorReturnType => {
  const names = value.split(' ');
  const uniqueNames = uniq(names);

  if (names.length === uniqueNames.length) {
    return false;
  }
  return 'Não digite o mesmo nome duas vezes.';
};

const hasPasswordOnlyNumberCharacteres = (
  value: ValidatorInputType
): ValidatorReturnType => {
  const rawValue = value.replace(/[^0-9a-zA-Z]/g, '');
  const onlyMixOfAlphaNumeric =
    /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;

  if (onlyMixOfAlphaNumeric.test(rawValue)) {
    return false;
  }
  return 'Sua senha deve conter ao menos uma letra e um número.';
};

const hasSpecialCharacters = (
  value: ValidatorInputType
): ValidatorReturnType => {
  const onlyHasLetters =
    /^[a-zA-ZâÂàÀáÁãÃêÊèÈéÉîÎìÌíÍõÕôÔòÒóÓüÜûÛúÚùÙçÇ ]*$/.test(value);
  if (onlyHasLetters) {
    return false;
  }
  return 'Digite nomes contendo apenas letras. Não é permitido uso de caracteres especiais.';
};

const cvv = (value: ValidatorInputType): ValidatorReturnType => {
  const onlyHasNumbers = /^\d+$/.test(value);
  if (onlyHasNumbers) {
    return false;
  }
  return 'Digite apenas números.';
};

export default {
  applyUnmask,
  between,
  birthday,
  cardExpirationDate,
  cardNumber,
  cep,
  cnpj,
  cpf,
  cpforcnpj,
  email,
  fullname,
  greaterThanOrEqual,
  hasAbbreviatedNames,
  hasDuplicateNames,
  hasSpecialCharacters,
  isDateLessThanCurrentDate,
  isEqualToZero,
  isNumeric,
  maxLength,
  mobilePhone,
  minLength,
  pastDate,
  required,
  rg,
  validDate,
  hasPasswordOnlyNumberCharacteres,
  cvv,
  isChecked,
};
