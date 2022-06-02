import { IProduct } from "./product";
import { User } from "./user";

export interface IOrder {
  id: number;
  amount: number;
	orderItems: IOrderItem[];
  date: Date;
  user: User;
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrderItem {
  id?: number;
	quantity: number;
	price: number;
  productId: number;
	product: IProduct;
	createdAt: Date;
	updatedAt: Date;
}
