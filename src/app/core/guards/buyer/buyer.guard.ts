import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { first, map, tap } from 'rxjs';
import { ERoles } from 'src/app/shared/enums/user';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
	providedIn: 'root',
})
export class BuyerGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.loggedInUser$.pipe(
      map(loggedInUser => loggedInUser?.user.role == ERoles.Buyer),
      tap(isBuyer => {
        if (!isBuyer) {
          this.router.navigate(['dashboard']);
        }
      }),
      first()
    );
	}
}
