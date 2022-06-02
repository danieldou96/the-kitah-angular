import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { Page } from 'src/app/shared/models/pagination/page.model';

export abstract class AbstractCrudService<T, ID, P> implements CrudOperations<T, ID, P> {
  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}

  save<RT>(t: T): Observable<RT> {
    return this._http.post<RT>(this._base, t);
  }

  update<RT>(id: ID, t: T): Observable<RT> {
    return this._http.put<RT>(this._base + "/" + id, t, {});
  }

  findOne<RT>(id: ID): Observable<RT> {
    return this._http.get<RT>(this._base + "/" + id);
  }

  findAll<RT>(): Observable<RT> {
    return this._http.get<RT>(this._base);
  }

  findAllPaginated(pageRequest?: PageRequest): Observable<Page<T, P>> {
    const params: {[key: string]: any} = !pageRequest ? {} : { 
      pageNumber: pageRequest.page,
      pageSize: pageRequest.size,
      sortCol: pageRequest.sort.column,
      sortDir: pageRequest.sort.direction
    };
    return this._http.get<Page<T, P>>(this._base, { params });
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
  }
}