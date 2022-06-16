import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

}
