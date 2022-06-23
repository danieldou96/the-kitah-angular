import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteSellersService } from 'src/app/core/services/favorite-sellers/favorite-sellers.service';
import { IStore } from 'src/app/shared/models/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  store: IStore;

  constructor(
    private activatedRoute: ActivatedRoute,
    public favoriteSellersService: FavoriteSellersService
  ) {
    this.store = this.activatedRoute.snapshot.data['store'];
  }

  isFavoriteSeller(favoriteSellers: IStore[], storeId: number) {
    return favoriteSellers.some(s => s.id == storeId);
  }
}
