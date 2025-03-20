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

export const productController = {
    createProduct
};
