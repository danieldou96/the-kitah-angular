import { ERoles } from "../enums/user";
import { User } from "./user";

export interface ApiFindResponse {
	data: any,
	meta: {
		pagination: {
				page: number;
				pageSize: number;
				pageCount: number;
				total: number;
		}
	}
}

export interface ApiResponse {
	statusCode: number;
	message: string;
	data: any;
}
