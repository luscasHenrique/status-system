import { User } from 'phosphor-react';
import Client from './User';
export interface Rate {
  id?: string;
  value: number;
  user?: Client;
}
