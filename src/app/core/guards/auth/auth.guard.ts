import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { tap, map, first } from 'rxjs';
import { tokenExpired } from 'src/app/shared/utils';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.loggedInUser$.pipe(
      tap(loggedInUser => {
        if (tokenExpired(loggedInUser?.token!)) {
          this.authService.logout();
        }
      }),
      map(loggedInUser => {
        if (loggedInUser) {
          return true;
        } else {
          return this.router.createUrlTree(['auth/login']);
        }
      }),
      first()
    );
	}
}
