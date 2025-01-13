import { Cart } from 'src/model/Cart';
import { Address } from './Address';
import CardClient from './CardClient';
import Gender from './Gender';
import { UserType } from './UserType';

export default interface Client {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  cellPhone: string;
  email: string;
  gender: Gender;
  birthDate: string; // Data no formato string
  motherName: string;
  image?: string;
  address?: Address[];
  cards?: CardClient[];
  cart?: Cart[];
  checkData?: boolean;
  data?: string;
  type: UserType;
  password?: string;
}
