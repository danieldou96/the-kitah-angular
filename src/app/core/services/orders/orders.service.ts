import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { ShopPageRequest } from 'src/app/shared/models/shop';
import { environment } from 'src/environments/environment';
import { AbstractCrudService } from '../crud/abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends AbstractCrudService<IOrder, number, ShopPageRequest> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiUrl}/orders`)
  }
}