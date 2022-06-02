import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { IOrder } from 'src/app/shared/models/order';
import { ShopFilters, ShopPageRequest } from 'src/app/shared/models/shop';
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