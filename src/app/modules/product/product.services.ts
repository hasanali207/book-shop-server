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

const getSingleProductFromDb = async (id:string) =>{
  const result = await ProductModel.findById(id);
  return result;
}

const updateProductFromDb = async (id:string, updateData:IProduct)=>{
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {new:true});
  return result;
}

const deleteProductFromDb = async (id:string)=>{
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
}
export const productServices = {
  createProductInDB,
  getAllProductFromDb,
  getSingleProductFromDb,
  updateProductFromDb,
  deleteProductFromDb
};
