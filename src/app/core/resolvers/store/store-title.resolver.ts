import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreTitleResolver implements Resolve<string> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getStore(route.params['url']).pipe(
      map(store => store.name)
    );
  }
}