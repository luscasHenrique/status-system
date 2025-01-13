import Client from './User';

export interface Store {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  imageDetail: string;
  imageBanner: string;
  address: string;
  user: Client;
}
