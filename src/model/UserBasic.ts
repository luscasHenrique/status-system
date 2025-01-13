import { Address } from './Address';

export interface UserBasic {
  name: string;
  cpf: string;
  gender: string;
  email: string;
  cellPhone: string;
  birthdate: string;
  password: string;
  address: Address;
  //   acceptedTerms: boolean;
  image: string;
}

export interface EventBasic {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  address: Address;
  image: string;
}

export interface PixBasic {
  image: string;
  numeroPix: string;
}
