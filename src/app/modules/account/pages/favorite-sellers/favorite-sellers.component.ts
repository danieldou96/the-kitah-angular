import { Component } from '@angular/core';
import { FavoriteSellersService } from 'src/app/core/services/favorite-sellers/favorite-sellers.service';

@Component({
  selector: 'app-favorite-sellers',
  templateUrl: './favorite-sellers.component.html',
  styleUrls: ['./favorite-sellers.component.scss']
})
export class FavoriteSellersComponent {
  constructor(public favoriteSellersService: FavoriteSellersService) { }
}
