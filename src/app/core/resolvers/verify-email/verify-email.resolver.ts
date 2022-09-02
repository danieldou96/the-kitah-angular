import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailResolver implements Resolve<Observable<boolean>> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.verifyEmail(route.params['link']).pipe(first());
  }
}