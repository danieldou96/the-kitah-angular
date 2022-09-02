import { Component, Inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { IOrder, IOrderItem } from 'src/app/shared/models/order';
import * as mime from 'mime';
import { DOCUMENT } from '@angular/common';

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
    @Inject(DOCUMENT) private document: Document
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
      console.log(mime.getType(productFileName))
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([file], { type: mime.getType(productFileName) ?? undefined });
      
      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      
      var link = this.document.createElement('a');
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
