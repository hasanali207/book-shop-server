import { Iorder } from './order.interface';
import { OrderModel } from './order.model';

//Get all orders
const getAllOrdersFromDB = async (): Promise<Iorder[]> => {
  const result = await OrderModel.find();
  return result;
};

//getOrdersById
const getOrderByIdFromDB = async (orderId: string): Promise<Iorder | null> => {
  const result = await OrderModel.findById(orderId);
  return result;
};

//Update orders
const updateOrderStatusInDB = async (
  orderId: string,
  status: string,
): Promise<Iorder | null> => {
  const result = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );
  return result;
};

//Dlete orders
const deleteOrderFromDB = async (orderId: string): Promise<Iorder | null> => {
  const result = await OrderModel.findByIdAndDelete(orderId);
  return result;
};

//Calculate revenw from DB
const calculateRevenueFromDB = async (): Promise<number> => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result.length > 0 ? result[0] : 0;
};

export const OrderServices = {
  getAllOrdersFromDB,
  calculateRevenueFromDB,
  updateOrderStatusInDB,
  deleteOrderFromDB,
  getOrderByIdFromDB,
};
