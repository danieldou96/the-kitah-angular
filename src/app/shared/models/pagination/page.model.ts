import { PageRequest } from './page-request.model';

export class Page<T, P> {
  public elements?: T[];
  public totalElements?: number;
  public totalPages?: number;
  public current?: P;
  public next?: P;
  public previous?: P;

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  public static from<T, P>(elements: T[], totalElements: number, pageRequest: PageRequest): Page<T, P> {
    return new Page<T, P>({
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageRequest.size),
      current: pageRequest,
      next: pageRequest.next(totalElements),
      previous: pageRequest.previous(totalElements)
    });
  }
}