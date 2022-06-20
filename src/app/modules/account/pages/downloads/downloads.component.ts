import { Component, Inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { IOrder, IOrderItem } from 'src/app/shared/models/order';

interface IDownload extends IOrderItem {
  name: string;
  format: string;
}

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {

  downloads$: Observable<IDownload[]>;

  constructor(
    private apiService: ApiService,
    private ordersService: OrdersService,
    @Inject(WINDOW) private window: Window
  ) {
    this.downloads$ = this.ordersService.findAll<IOrder[]>().pipe(
      map(orders => {
        const orderItems = orders.map(o => o.orderItems).flat().filter((v,i,a)=>a.findIndex(v2=>(v2.productId===v.productId))===i);
        return orderItems.map(o => <IDownload>{
          ...o,
          name: o.product.name,
          format: o.product.format
        })
      })
    )
  }

  downloadFile(productId: number, productFileName: string) {
    this.apiService.downloadProductFile(productId).subscribe(file => {
      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(file);
      
      const link = document.createElement('a');
      link.href = data;
      link.download = `${productFileName}`;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      
      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
    });
  }

}
