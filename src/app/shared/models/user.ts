import { ERoles } from "../enums/user";

export interface User {
	id: number;
  firstname: string;
  lastname: string;
	username: string;
	email: string;
	role: ERoles;
	confirmed: boolean;
	banned: boolean;
	createdAt: Date;
	updatedAt: Date;
}