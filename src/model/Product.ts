import { Category } from './Category';
import { Brand } from './Brand';
import { Dimensions } from './Dimensions';
import { Price } from './Price';
import { Ratings } from './Ratings';
import { Warranty } from './Warranty';
import { Grade } from './Grade';
import { ProductReview } from './ProductReview';

// Enum para definir os status possíveis para o produto
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
}

// Modelo Principal do Produto
export interface Product {
  id: string;
  name: string;
  description: string;
  stock: string;
  promotion: boolean;
  dateAt: string;
  update: string;
  sku: string;
  status: ProductStatus;
  category: Category[];
  brand: Brand;
  dimensions: Dimensions;
  imagens: string[];
  price: Price;
  ratings: Ratings[];
  review: ProductReview[];
  tags: string[];
  warranty: Warranty;
  grade?: Grade[];
  totalSale?: string;
  lozalization?: string;
}
