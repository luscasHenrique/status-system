/* eslint-disable no-useless-escape */
import { isCPFOrCNPJ, formatToCPFOrCNPJ } from 'brazilian-values';

const isValid = (value: string): boolean => {
  const regex = /^(\d{0,3})\.(\d{0,3})\.(\d{0,3})\-(\d{0,2})?$/;
  if (!regex.test(value)) {
    return false;
  }
  return isCPFOrCNPJ(value);
};

const unmask = (value: string): string => value.replace(/\D/g, '');

const updateMask = (value: string): string => {
  const response = formatToCPFOrCNPJ(value);
  return response;
};

export { isValid, unmask, updateMask };
