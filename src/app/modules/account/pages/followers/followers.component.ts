import { Component } from '@angular/core';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent {
  constructor(public storeService: StoreService) { }
}
