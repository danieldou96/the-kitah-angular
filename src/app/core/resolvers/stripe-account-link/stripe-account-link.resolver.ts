import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class StripeAccountLinkResolver implements Resolve<Observable<string>> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.stripeAccountLink().pipe(first());
  }
}