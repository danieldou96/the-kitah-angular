import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { ApiResponse } from 'src/app/shared/models/api-response';

export abstract class AbstractCrudService<T, ID, P> implements CrudOperations<T, ID, P> {
  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}

  save<RT>(t: T): Observable<RT> {
    return this._http.post<ApiResponse<RT>>(this._base, t).pipe(map(apiResponse => apiResponse.data));
  }

  update<RT>(id: ID, t: T): Observable<RT> {
    return this._http.put<ApiResponse<RT>>(this._base + "/" + id, t, {}).pipe(map(apiResponse => apiResponse.data));
  }

  findOne<RT>(id: ID): Observable<RT> {
    return this._http.get<ApiResponse<RT>>(this._base + "/" + id).pipe(map(apiResponse => apiResponse.data));
  }

  findAll<RT>(): Observable<RT> {
    return this._http.get<ApiResponse<RT>>(this._base).pipe(map(apiResponse => apiResponse.data));
  }

  findAllPaginated(pageRequest?: PageRequest): Observable<Page<T, P>> {
    const params: {[key: string]: any} = !pageRequest ? {} : { 
      pageNumber: pageRequest.page,
      pageSize: pageRequest.size,
      sortCol: pageRequest.sort.column,
      sortDir: pageRequest.sort.direction
    };
    return this._http.get<ApiResponse<Page<T, P>>>(this._base, { params }).pipe(map(apiResponse => apiResponse.data));
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<ApiResponse<T>>(this._base + '/' + id).pipe(map(apiResponse => apiResponse.data));
  }
}