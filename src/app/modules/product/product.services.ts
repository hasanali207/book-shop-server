import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDb = async (filter = {}) => {
  const result = await ProductModel.find(filter);
  return result;
};

export const productServices = {
  createProductInDB,
  getAllProductFromDb,
};
