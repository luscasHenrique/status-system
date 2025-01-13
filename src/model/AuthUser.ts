import { UserType } from './UserType';

export interface AuthUser {
  id: 'string';
  name: 'string';
  imageUrl?: 'string';
  type: UserType;
}
