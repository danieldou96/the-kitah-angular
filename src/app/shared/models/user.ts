import { Roles } from "../enums/user";

export interface User {
	id: number;
  firstname: string;
  lastname: string;
	username: string;
	email: string;
	phone: string;
	role: Roles;
	confirmed: boolean;
	banned: boolean;
	createdAt: Date;
	updatedAt: Date;
}