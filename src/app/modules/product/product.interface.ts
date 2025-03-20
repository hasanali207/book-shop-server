export enum ProductCategory {
    HISTORY = 'History',
    DRAMA = 'Drama',
    THRILLER = 'Thriller',
    NOVEL = 'Novel',
    SCIFI = 'SciFi',
    FANTASY = 'Fantasy',
}

export interface IProduct {
    name: string;
    author: string;
    price: number;
    quantity: number;
    category: ProductCategory;
    description: string;
    imgURL: string;
    inStock: boolean;
}
