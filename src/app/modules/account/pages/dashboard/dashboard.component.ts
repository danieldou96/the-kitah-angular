import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StoreService } from 'src/app/core/services/store/store.service';
import * as shape from 'd3-shape';


interface SalesChartSerie {
  name: string;
  value: number;
}

interface SalesChartData {
  name: string;
  series: SalesChartSerie[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  curve = shape.curveMonotoneX;
  view: [number,number] = [700, 500];

  firstDay: Date;
  lastDay: Date;

  salesChartsData$: Observable<SalesChartData[]>;

  constructor(
    public storeService: StoreService,
    private datePipe: DatePipe
  ) {
    const date = new Date();
    this.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.salesChartsData$ = this.storeService.store$.pipe(
      map(store => {
        const orders = store.orders;
        const orderSeries: SalesChartSerie[] = getDaysArray(this.firstDay, this.lastDay).map(date => {
          return {
            name: this.datePipe.transform(date, 'd MMM'),
            value: orders?.filter(o => o.date.getFullYear() === date.getFullYear() && o.date.getMonth() === date.getMonth() && o.date.getDate() === date.getDate()).length
          } as SalesChartSerie;
        });
        const saleSeries: SalesChartSerie[] = getDaysArray(this.firstDay, this.lastDay).map(date => {
          return {
            name: this.datePipe.transform(date, 'd MMM'),
            value: orders?.filter(o => o.date.getFullYear() === date.getFullYear() && o.date.getMonth() === date.getMonth() && o.date.getDate() === date.getDate()).map(o => o.amount).reduce((partialSum, a) => partialSum + a, 0)
          } as SalesChartSerie;
        });
        return [
          <SalesChartData>{
            name: 'Orders',
            series: orderSeries
          },
          <SalesChartData>{
            name: 'Sales',
            series: saleSeries
          }
        ];
      })
    );
  }
}

function getDaysArray(start: Date, end: Date) {
  for(var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)){
      arr.push(new Date(dt));
  }
  return arr;
};