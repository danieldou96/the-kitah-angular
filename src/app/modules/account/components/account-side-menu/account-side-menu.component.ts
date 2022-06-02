import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-account-side-menu',
  templateUrl: './account-side-menu.component.html',
  styleUrls: ['./account-side-menu.component.scss']
})
export class AccountSideMenuComponent {
  
  loggedInUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      map(apiAuthResponse => apiAuthResponse ?? null),
      map(userToken => userToken?.user!)
    );
  }

  logout() {
    this.authService.logout();
  }
}
