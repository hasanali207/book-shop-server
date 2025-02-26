export type TBook = {
  title: string;
  author: string;
  price: number;
  category: 'Novel' | 'Drama' | 'History' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  };
  