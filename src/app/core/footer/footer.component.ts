import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ApiService } from '../http/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  
  getHomepageStats$: Observable<{
    products: number;
    vendors: number;
    members: number;
  }>;

  constructor(private apiService: ApiService) {
    this.getHomepageStats$ = this.apiService.getHomepageStats().pipe(
      shareReplay(1)
    );
  }
}
