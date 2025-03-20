import { Request, Response } from 'express';
import { productServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Call service to send data
    const result = await productServices.createProductInDB(productData);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Something went wrong',
      success: false,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.searchTerm as string | undefined;
      const minPrice = (req.query.minPrice as string) || 0;
      const maxPrice = (req.query.maxPrice as string) || Infinity;
      const onlyAvailable = req.query.onlyAvailable === 'true';
  
      const filter: any = {
        price: {
          $gte: minPrice,
          $lte: maxPrice,
        },
      };
  
    
      if (onlyAvailable) {
        filter.inStock = true;  
      }
  
      
      if (searchTerm) {
        filter.$or = [
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ];
      }
  
      // Call service to send data
      const result = await productServices.getAllProductFromDb(filter);
  
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        message: err.message || 'Something went wrong',
        success: false,
      });
    }
  };
  

export const productController = {
  createProduct,
  getAllProduct,
};
