import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { IProduct, IStore } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { AbstractCrudService } from '../crud/abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends AbstractCrudService<IStore, number, PageRequest> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiUrl}/store`)
  }

  myProducts() {
    return this._http.get<ApiResponse>(`${this._base}/my-products`);
  }
}