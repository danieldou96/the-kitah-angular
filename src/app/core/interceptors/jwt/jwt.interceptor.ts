import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, first, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Add auth header with JWT if user is logged in
		return of(EMPTY).pipe(
			switchMap(() => this.authService.loggedInUser$.pipe(first())),
			map(loggedInUser => {
				if (loggedInUser?.token) {
					return request.clone({
						setHeaders: { Authorization: `Bearer ${loggedInUser.token}` }
					});
				}
				return request;
			}),
			switchMap(request => next.handle(request))
		);
	}
}