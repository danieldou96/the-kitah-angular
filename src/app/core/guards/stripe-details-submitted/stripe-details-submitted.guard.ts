import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
  Router
} from '@angular/router';
import { filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { ApiService } from '../../http/api.service';

@Injectable({
	providedIn: 'root',
})
export class StripeDetailsSubmittedGuard implements CanActivate {
	constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isVendor$.pipe(
      switchMap(isVendor => {
        /*if (isVendor) {
          return this.apiService.checkIfStripeDetailsSubmitted();
        } else {*/
          return of(true);
        //}
      }),
      map(stripeDetailsSubmitted => {
        if (stripeDetailsSubmitted) {
          return true;
        } else {
          return this.router.createUrlTree(['dashboard/resume-stripe-form']);
        }
      })
    );
	}
}
