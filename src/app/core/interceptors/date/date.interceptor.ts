import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DateInterceptor implements HttpInterceptor {

	constructor() { }

	iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					const body = event.body;
					this.convertToDate(body);
				}
			}, (err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
					}
				}
			}),
		);
	}

	convertToDate(body: any) {
		if (!body || typeof body !== 'object') {
			return body;
		}

		for (const key of Object.keys(body)) {
			const value = body[key];
			if (this.isIso8601(value)) {
				body[key] = new Date(value);
			} else if (typeof value === 'object') {
				this.convertToDate(value);
			}
		}
	}

	isIso8601(value: string) {
		if (!value) {
			return false;
		}

		return this.iso8601.test(value);
	}
}
