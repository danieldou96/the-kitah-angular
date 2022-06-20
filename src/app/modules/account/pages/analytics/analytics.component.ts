import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';

export interface IProductAnalyticsSales {
  product: { id: number; name: string; };
  sold: number;
  earnings: number;
}

export interface IProductAnalyticsActivity {
  product: { id: number; name: string; };
  posted: Date;
  pageViews: number;
  downloads: number;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit {

  @ViewChild('productNameTpl', { static: true }) productNameTpl!: TemplateRef<any>;
  @ViewChild('earningsTpl', { static: true }) earningsTpl!: TemplateRef<any>;
  @ViewChild('postedDateTpl', { static: true }) postedDateTpl!: TemplateRef<any>;

  activityRows$: Observable<IProductAnalyticsActivity[]>;
  activityColumns!: TableColumn[];
  salesRows$: Observable<IProductAnalyticsSales[]>;
  salesColumns!: TableColumn[];
  ColumnMode = ColumnMode;

  constructor(
    private storeService: StoreService,
    private cd: ChangeDetectorRef
  ) {
    this.activityRows$ = this.storeService.analytics$;
    this.salesRows$ = this.storeService.sales$;
  }

  ngAfterViewInit() {
    this.salesColumns = [
      { name: 'Product', prop: 'product', cellTemplate: this.productNameTpl, comparator: this._productComparator.bind(this) },
      { name: 'Sold', prop: 'sold' },
      { name: 'Earnings', prop: 'earnings', cellTemplate: this.earningsTpl }
    ];
    this.activityColumns = [
      { name: 'Product', prop: 'product', cellTemplate: this.productNameTpl, comparator: this._productComparator.bind(this) },
      { name: 'Posted', prop: 'posted', cellTemplate: this.postedDateTpl },
      { name: 'Page views', prop: 'pageViews' },
      { name: 'Downloads', prop: 'downloads' }
    ];
    this.cd.detectChanges();
  }

  private _productComparator(product1: { id: number; name: string; }, product2: { id: number; name: string; }) {
    if (product1.name.toLowerCase() < product2.name.toLowerCase()) {
      return -1;
    }
    if (product1.name.toLowerCase() > product2.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }
}
