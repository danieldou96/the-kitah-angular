import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';
/*import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public graph = {
    data: [
        { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter'}
    ],
    layout: {width: 320, height: 240, title: 'A Fancy Plot'}
};

/*public lineChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  { data: [65, 59, 80, 81, 56, 55, 80], label: 'Series B' },
];
public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public lineChartOptions: (ChartOptions & { annotation: any }) = {
  responsive: true,
};
public lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
];*/

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

}
