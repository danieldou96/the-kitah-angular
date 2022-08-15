import { ERoles } from "../enums/user";
import { IStore } from "./product";

export interface User {
	id: number;
  avatar?: string;
  firstname: string;
  lastname: string;
	username: string;
	email: string;
	role: ERoles;
	confirmed: boolean;
	billing: IBilling;
	banned: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IBilling {
	firstname: string;
	lastname: string;
	company?: string;
  street1: string;
  street2?: string;
  city: string;
  state?: string;
  zipcode: string;
  country: string;
  sourceId: string;
}