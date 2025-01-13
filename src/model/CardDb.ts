import CardType from './CardType';
import Client from './User';

export default interface CardDb {
  id: string;
  exibitionNumber: string;
  number: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
  cardholderCpf: string;
  cardType: CardType;
  actived: boolean;
  client: Client;
  validated: boolean;
}
