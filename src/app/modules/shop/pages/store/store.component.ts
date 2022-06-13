import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/shared/models/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  store: IStore;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.store = this.activatedRoute.snapshot.data['store'];
  }
}
