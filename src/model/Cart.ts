import { Product } from 'src/model/Product';
import { Store } from './Store';
export interface Cart {
  id: string;
  products: Product;
  quantity: number;
  store: Store;
}
