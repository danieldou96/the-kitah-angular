import { IGalleryItem } from "./gallery-item";
import { User } from "./user";

export interface IProduct {
  id?: number;
  storeId?: number;
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
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICartItem {
  id?: number;
	quantity: number;
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
  userId: number;
  name: string;
  url: string;
  country: string;
  state: string;
  city: string;
  description: string;
	user: User;
	products: IProduct[];
}
