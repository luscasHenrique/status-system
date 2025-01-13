import { Product } from './Product';
import StatusType from './StatusType';
import Client from './User';

export interface ProductReview {
  id: string;
  score: number;
  description: string;
  user: Client;
  product: Product;
  status: StatusType;
  dateAt: Date;
}
