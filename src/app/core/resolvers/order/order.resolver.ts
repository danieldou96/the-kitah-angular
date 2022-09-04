import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { IOrder } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<Observable<IOrder | void>> {

  constructor(
    private router: Router,
    private orderService: OrdersService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const currentNavigation = this.router.getCurrentNavigation();

    if (currentNavigation && currentNavigation.extras && currentNavigation.extras.state) {
      const orderId = currentNavigation.extras.state['orderId'];

      if (orderId) {
        return this.orderService.findOne<IOrder>(orderId);
      }
    }

    return of(void 0).pipe(
      tap(() => this.router.navigateByUrl('/'))
    );
  }
}