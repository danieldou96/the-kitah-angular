import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { IProduct } from 'src/app/shared/models/product';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class StripeTokenResolverService implements Resolve<Observable<string>> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getStripeIntentSecret().pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as string)
    );
  }
}