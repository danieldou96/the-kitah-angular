import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status == HttpStatusCode.Unauthorized/* || error.status == HttpStatusCode.Forbidden*/) {
					this.authService.logout();
				}
				return throwError(() => error);
			})
		);
	}
}