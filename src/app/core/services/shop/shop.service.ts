import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  public readonly filtersSidebarOpened$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
