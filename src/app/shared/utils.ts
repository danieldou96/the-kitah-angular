export function decodeJwtData<T>(token: string): T | undefined {
	if (!token) {
		return undefined;
	}
	return JSON.parse(atob(token.split('.')[1]));
}

export function getAllNumbersBetween(size: number) {
  return Array.from({ length: size },(v,k) => k + 1);
}

export function extname(filename: string) {
	return filename.split('.').pop();
}

export function tokenExpired(token: string) {
	const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
	return Math.floor(new Date().getTime() / 1000) >= expiry;
}