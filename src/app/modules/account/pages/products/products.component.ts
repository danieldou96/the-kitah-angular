import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { IProduct } from 'src/app/shared/models/product';

@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  myProducts: IProduct[];

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cd: ChangeDetectorRef,
    private hotToastService: HotToastService,
  ) {
    this.myProducts = this.activatedRoute.snapshot.data['products'];
  }

  deleteProduct(id: number) {
    this.productsService.delete(id).pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.myProducts = this.myProducts.filter(p => p.id != id);
      this.hotToastService.success('The product has been deleted!');
      this.cd.detectChanges();
    });
  }

}
