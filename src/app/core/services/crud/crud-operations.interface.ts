import { Observable } from 'rxjs';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { Page } from 'src/app/shared/models/pagination/page.model';

export interface CrudOperations<T, ID, P> {
  save(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  findOne(id: ID): Observable<T>;
  findAll(pageRequest?: PageRequest): Observable<Page<T, P>>;
  findAllPaginated(pageRequest?: PageRequest): Observable<Page<T, P>>;
  delete(id: ID): Observable<any>;
}