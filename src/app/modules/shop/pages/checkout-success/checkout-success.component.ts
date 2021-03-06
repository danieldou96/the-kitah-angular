import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent {
  order: IOrder;

  constructor(private route: ActivatedRoute) {
    this.order = this.route.snapshot.data['order'];
  }
}
