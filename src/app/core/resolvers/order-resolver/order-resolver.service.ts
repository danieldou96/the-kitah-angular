import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { IOrder } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Observable<IOrder>> {

  constructor(
    private router: Router,
    private orderService: OrdersService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.orderService.findOne<ApiResponse>(route.params['id'] ?? this.router.getCurrentNavigation()!.extras!.state!['orderId']).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IOrder)
    );
  }
}