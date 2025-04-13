export enum ProductCategory {
  NOVEL = 'Novel',
  ADVENTURE = 'Adventure',
  DRAMA = 'Drama',
  HISTORY = 'History',
  FANTASY = 'Fantasy',
}

export interface IProduct {
  name: string;
  author: string;
  price: number;
  quantity: number;
  category: ProductCategory;
  description: string;
  imgURL?: string;
  inStock: boolean;
}
