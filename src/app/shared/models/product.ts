import { IOrder } from "./order";
import { User } from "./user";

export interface IProduct {
  id?: number;
  storeId?: number;
  sales?: number;
  name: string;
  price: number;
  description: string;
  published?: boolean;
  featured?: boolean;
  mainPicture?: IFile;
  rating?: number;
  ratingCount?: number;
  format?: string;
  file?: IFile;
  previewsType?: 'auto' | 'upload' | 'later';
	gallery: IFile[];
	store?: IStore;
	reviews?: IReview[];
	grades: IGrade[];
	subjects: ISubject[];
	resourceTypes: IResourceType[];
	relatedProducts?: IProduct[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICartItem {
  id?: number;
	product: IProduct;
}

export interface ICart {
	cartItems: ICartItem[];
  discountCodes: IDiscountCode[];
}

export interface IDiscountCode {
  id: number;
  type: 'percent' |'fixed';
  code: string;
  amount: number;
  usageLimit: number;
}

/*export interface IGalleryItem {
	previewImage: string;
	thumbImage: string;
	fullImage: string;
}*/

export interface IReview {
  user: User;
  text: string;
  rate: number;
  productId: number;
  date: Date;
}

export interface IFile {
  id?: number;
	url: string;
	size: number;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IGrade {
  id: number;
  name: string;
  slug: string;
  sort: number;
}

export interface ISubject {
  id: number;
  name: string;
  slug: string;
  sort: number;
	children: ISubject[];
}

export interface IResourceType {
  id: number;
  name: string;
  slug: string;
  sort: number;
}

export interface IStore {
	id: number;
  picture?: string;
  userId: number;
  sales?: number;
  balance?: number;
  salesAmount?: number;
  monthSalesAmount?: number;
  orders?: IOrder[];
  name: string;
  url: string;
  country: string;
  avatar?: string;
  banner?: string;
  state: string;
  city: string;
  description: string;
	newOrderNotification: boolean;
	user: User;
	products: IProduct[];
	createdAt?: Date;
	updatedAt?: Date;
}
