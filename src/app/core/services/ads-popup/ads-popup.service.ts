import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AdsPopupComponent } from 'src/app/shared/components/ads-popup/ads-popup.component';

@Injectable({
  providedIn: 'root'
})
export class AdsPopupService {

  constructor(
		private readonly cookieService: CookieService,
		private readonly dialog: MatDialog
  ) {
  }

  openAdsPopup() {
    setTimeout(() => {
      if (this.cookieService.get('chanukahGiftShowed') == 'true') {
        return;
      }
      this.dialog.open(AdsPopupComponent, {
        data: {
          title: 'Hey, we’ve got something special for you!',
          description: 'Don’t miss this exclusive Chanukah download',
          buttonLabel: '',
          declineText: 'No thanks, I don’t want this awesome offer'
        }
      });
      // 5 days
      this.cookieService.set('chanukahGiftShowed', 'true', 432000000, '/');
    }, 5000);
  }
}
