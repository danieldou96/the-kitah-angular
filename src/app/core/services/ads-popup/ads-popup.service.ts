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
      if (this.cookieService.get('popupShowed') == 'true') {
        return;
      }
      this.dialog.open(AdsPopupComponent, {
        data: {
          title: 'The whatsapp status for teachers!',
          description: '<p>Join our whatsapp status to see new daily uploads: <a href="https://wa.me/message/KZ4EUKPXZGLZC1" target="_blank">Join our whatsapp status to see new daily uploads</a><p><p>Or check us out on <a href="https://www.instagram.com/the.kitah/" target="_blank">Instagram</a>',
          buttonLabel: '',
          declineText: 'No thanks'
        }
      });
      // 10 days
      this.cookieService.set('popupShowed', 'true', 864000000, '/');
    }, 5000);
  }
}
