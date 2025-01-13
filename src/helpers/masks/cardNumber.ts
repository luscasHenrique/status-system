// unmasked (api view): 1234 5678 9012 3456
// masked (user view): 1234 5678 9012 3456

import CardType from '../../model/CardType';

const isValid = (value: string): boolean => {
  //const regex = /^(\d{4}) (\d{4}) (\d{4}) (\d{4})$/;
  //return regex.test(value);
  return validateCard(value);
};

const format = (value: string): string | null => {
  if (!isValid(value)) {
    return null;
  }
  return value;
};

const unmask = (value: string): string => value;

const updateMaskCard = (value: string): string => formatCardNumber(value);

const updateMaskCVV = (value: string): string => {
  const newValue = value.replace(/\D/g, '');
  return newValue.substring(0, 4);
};

const updateHolderName = (value: string): string => {
  return value.toUpperCase();
};

interface CreditCards {
  visa: RegExp;
  elo: RegExp;
  mastercard: RegExp;
  amex: RegExp;
  discover: RegExp;
  diners_club: RegExp;
  jcb: RegExp;
}

const acceptedCreditCards: CreditCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  elo: /^(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/,
  mastercard:
    /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover:
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
};

const checkLuhn = (value: string): boolean => {
  const newValue = value.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  for (let i = newValue.length - 1; i >= 0; i--) {
    let digit = parseInt(newValue.charAt(i));

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 == 0;
};

const checkSupported = (value: string): boolean => {
  const newValue = value.replace(/\D/g, '');
  let accepted = false;

  Object.keys(acceptedCreditCards).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const regex = (acceptedCreditCards as any)[key] as RegExp;
    if (regex.test(newValue)) {
      accepted = true;
    }
  });

  return accepted;
};

const getCreditCardLabel = (value: string): CardType => {
  const newValue = value.replace(/\D/g, '');
  let cardType = CardType.MASTER_CARD;
  Object.keys(acceptedCreditCards).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const regex = (acceptedCreditCards as any)[key] as RegExp;
    if (regex.test(newValue)) {
      if (key === 'visa') {
        cardType = CardType.VISA;
      } else if (key === 'elo') {
        cardType = CardType.ELO;
      } else if (key === 'mastercard') {
        cardType = CardType.MASTER_CARD;
      } else if (key === 'amex') {
        cardType = CardType.AMERICAN_EXPRESS;
      } else if (key === 'discover') {
        cardType = CardType.DISCOVER;
      } else if (key === 'diners_club') {
        cardType = CardType.DINERS_CLUB;
      } else if (key === 'jcb') {
        cardType = CardType.JCB;
      }
    }
  });

  return cardType;
};

const validateCard = (value: string): boolean => {
  /*
  const newValue = value.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  // loop through values starting at the rightmost side
  for (let i = newValue.length - 1; i >= 0; i--) {
    let digit = parseInt(newValue.charAt(i));

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const valid = sum % 10 == 0;
  */
  const valid = checkLuhn(value);
  /*
  let accepted = false;

  Object.keys(acceptedCreditCards).forEach(function (key) {
    const regex = (acceptedCreditCards as any)[key] as RegExp;
    if (regex.test(newValue)) {
      accepted = true;
    }
  });
  */
  const accepted = checkSupported(value);
  return valid && accepted;
};

const validateCVV = (creditCard: string, cvv: string) => {
  const newCreditCard = creditCard.replace(/\D/g, '');
  const newCvv = cvv.replace(/\D/g, '');
  // american express and cvv is 4 digits
  if (
    acceptedCreditCards.amex.test(newCreditCard) ||
    acceptedCreditCards.discover.test(newCreditCard)
  ) {
    if (/^\d{4}$/.test(newCvv)) return true;
  } else if (/^\d{3}$/.test(newCvv)) {
    return true;
  }
  return false;
};

const formatCardNumber = (value: string): string => {
  const newValue = value.replace(/\D/g, '');
  let formattedValue: string | undefined;
  //let maxLength = 0;
  const amexRegex = /^3[47]\d{0,13}$/;
  const dinersRegex = /^3(?:0[0-5]|[68]\d)\d{0,11}$/;
  const othersRegex = /^\d{0,16}$/;
  if (amexRegex.test(newValue)) {
    formattedValue = newValue
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{6})/, '$1 $2 ')
      .substring(0, 17);
    //maxLength = 17;
  } else if (dinersRegex.test(newValue)) {
    formattedValue = newValue
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{6})/, '$1 $2 ')
      .substring(0, 16);
    //maxLength = 16;
  } else if (othersRegex.test(newValue)) {
    formattedValue = newValue
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
      .substring(0, 19);
  } else {
    formattedValue = newValue
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
      .substring(0, 19);
  }
  return formattedValue as string;
};

export {
  isValid,
  format,
  unmask,
  updateMaskCard,
  validateCVV,
  updateMaskCVV,
  updateHolderName,
  getCreditCardLabel,
};
