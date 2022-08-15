import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private injector: Injector) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				const hotToastService = this.injector.get(HotToastService);
				if (typeof error.error.message == 'string') {
					hotToastService.error(error.error.message);
				} else if (Array.isArray(error.error.message)) {
					hotToastService.error(error.error.message.join('<br>'));
				}
				return throwError(() => error);
			})
		);
	}
}
