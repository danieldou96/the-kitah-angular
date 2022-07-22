import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { IBilling } from 'src/app/shared/models/user';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class BillingResolver implements Resolve<Observable<IBilling>> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getUserBilling().pipe(
      first()
    );
  }
}