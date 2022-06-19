import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, first, map, merge, Observable, of, ReplaySubject, shareReplay, tap, timer } from 'rxjs';
import { ERoles } from 'src/app/shared/enums/user';
import { User } from 'src/app/shared/models/user';
import { decodeJwtData } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

export interface UserToken {
	token: string;
	user: User;
}

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // User data
	public readonly loggedInUser$: Observable<UserToken | null>;
	private readonly _loggedUserSubject$: ReplaySubject<UserToken | null>;
	private _loggedInUser: UserToken | null = null;

  public isVendor$: Observable<boolean>;

	constructor(
		private router: Router,
		private hotToastService: HotToastService,
		private http: HttpClient,
		@Inject(LOCAL_STORAGE) private localStorage: Storage
	) {
		this._loggedUserSubject$ = new ReplaySubject<UserToken | null>(1);
		this.loggedInUser$ = merge(
			this._loggedUserSubject$,
			of(localStorage.getItem('currentUser')).pipe(
				map(currentUserToken => currentUserToken ? {
					token: currentUserToken,
					user: decodeJwtData<User>(currentUserToken)!
				} : null),
				tap(currentUser => {
					// Logout if the token has expired
					if (currentUser) {
						if (tokenExpired(currentUser.token)) {
							this.logout();
						} else {
							this.expirationCounter(currentUser.token);
						}
					}
				}),
				first()
			)
		).pipe(
			tap(currentUser => this._loggedInUser = currentUser),
			shareReplay(1)
		);
    this.isVendor$ = this.loggedInUser$.pipe(
      map(u => u?.user?.role == ERoles.Vendor)
    );
	}

	public get loggedInUser(): UserToken | null {
		return this._loggedInUser;
	}

	/** @description Login to Chabad.org Shliach account */
	public login(username: string, password: string): Observable<any> {
		const url = `${environment.apiUrl}/auth/login`;

		const navigation = this.router.getCurrentNavigation();
		const redirectUrl = navigation?.extras?.state?.['redirectUrl'] as string;

		return this.http
			.post<{ token: string; }>(url, {
				username,
				password,
			}).pipe(
				catchError(err => of(err.error)),
				tap(apiResponse => {
					const user = decodeJwtData<User>(apiResponse.token);
					if (user) {
						// Store user data in cookies
						this.localStorage.setItem('currentUser', apiResponse.token);
						this.localStorage.setItem('shoppingCart', '[]')
						// Store the logged user data
						this._loggedUserSubject$.next({
							token: apiResponse.token,
							user
						});
						this.router.navigateByUrl(redirectUrl ?? '');
						// Set automatically logout
						this.expirationCounter(apiResponse.token);
					} else {
						console.error('The User is not valid');
						this.hotToastService.error('Username or password is not correct.', {
							duration: 3000
						});
					}
				})
			);
	}

	/** @description Login to Chabad.org Shliach account */
	public register(registerForm: any): Observable<any> {
		const url = `${environment.apiUrl}/auth/register`;
		return this.http.post<any>(url, registerForm).pipe(
			catchError(err => of(err)),
			tap(result => {
				if (result.error) {
					this.hotToastService.error(result.error.message, {
						duration: 3000
					});
				} else {
					this.hotToastService.success('The user has been created successfully. Please Log in.', {
						duration: 3000
					});
					this.router.navigateByUrl('auth/login');
				}
			})
		);
	}

	public logout() {
		// Remove user data
		this.localStorage.removeItem('currentUser');
		this._loggedUserSubject$.next(null);
		// Redirect to login page
		this.router.navigateByUrl('auth/login');
	}

	/** @description Automatically logout the user when his token expires */
	private expirationCounter(token: string) {
		const expiration = decodeJwtData<any>(token)?.exp!;
		const now = Math.floor(new Date().getTime() / 100000);
		const timeout = expiration - now;

		timer(timeout).pipe(
			untilDestroyed(this)
		).subscribe(() => {
			this.logout();
		});
	}
}

function tokenExpired(token: string) {
	const expiry = decodeJwtData<any>(token)?.exp!;
	return Math.floor(new Date().getTime() / 1000) >= expiry;
}