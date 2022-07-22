import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
  Router
} from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from '../../http/api.service';

@Injectable({
	providedIn: 'root',
})
export class StripeDetailsSubmittedGuard implements CanActivate {
	constructor(private apiService: ApiService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.apiService.checkIfStripeDetailsSubmitted().pipe(
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
