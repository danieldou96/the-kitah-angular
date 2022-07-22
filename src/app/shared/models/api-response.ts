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

export interface ApiResponse<T = any> {
	statusCode: number;
	message: string;
	data: T;
}
