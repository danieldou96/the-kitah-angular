import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/shared/models/product';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreResolver implements Resolve<Observable<IStore>> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getStore(route.params['url']);
  }
}