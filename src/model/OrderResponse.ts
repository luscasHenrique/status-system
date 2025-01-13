import Client from './User';
import { Order } from './Order';

export interface OrderResponse {
  order: Order;
  user: Client;
}
