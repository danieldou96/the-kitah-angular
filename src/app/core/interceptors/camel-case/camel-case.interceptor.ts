import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (
					event instanceof HttpResponse &&
					(event.headers.get('content-type') || '').indexOf(
						'application/json'
					) > -1
				) {
					if (event.body.constructor === Object) {
						return event.clone({
							body: Object.assign(
								camelcaseKeys(event.body, {
									deep: true,
									exclude: ['_permissions'],
								})
							),
						});
					} else if (event.body.constructor === Array) {
						return event.clone({
							body: event.body.map((item: any) =>
								Object.assign(
									camelcaseKeys(item, { deep: true, exclude: ['_permissions'] })
								)
							),
						});
					}
				}
				return event;
			})
		);
	}
}
