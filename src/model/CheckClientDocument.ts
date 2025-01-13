import User from './User';

export interface CheckClientDocument {
  client: User;
  changePassword: boolean;
  checkConfirmationCode: boolean;
}
