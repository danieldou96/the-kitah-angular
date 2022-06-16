import { IGalleryItem } from "./gallery-item";
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
	reviews?: Review[];
	grades: IGrade[];
	subjects: ISubject[];
	resourceTypes: IResourceType[];
	relatedProducts?: IProduct[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICartItem {
  id?: number;
	quantity: number;
	product: IProduct;
}

export interface IRecentlyViewedProductItem {
  id?: number;
	product: IProduct;
}

/*export interface IGalleryItem {
	previewImage: string;
	thumbImage: string;
	fullImage: string;
}*/

export interface Review {

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
  withdraws?: IWithdraw[];
  orders?: IOrder[];
  name: string;
  url: string;
  country: string;
	phone: string;
  state: string;
  city: string;
  description: string;
	user: User;
	products: IProduct[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IWithdraw {
  id: number;
  amount: number;
  date: Date;
	store?: IStore;
	status: 'processing' | 'finished';
	createdAt: Date;
	updatedAt: Date;
}