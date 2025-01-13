import CardType from './CardType';

export default interface Card {
  holder: string;
  number: string;
  expirationDate?: string;
  expMonth: string;
  expYear: string;
  securityCode: string;
  document: string;
  cardType: CardType;
}
