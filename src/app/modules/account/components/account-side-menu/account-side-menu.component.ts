import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DocumentService } from 'src/app/core/services/document/document.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-account-side-menu',
  templateUrl: './account-side-menu.component.html',
  styleUrls: ['./account-side-menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ overflow: 'hidden', height: '0px' }),
        animate('.3s ease-in-out', 
        style({ overflow: 'hidden', height: '*' }))
      ]),
      transition(':leave', [
        style({ overflow: 'hidden', height: '*' }),
        animate('.3s ease-in-out', 
        style({ overflow: 'hidden', height: '0px' }))
      ])
    ])
  ]
})
export class AccountSideMenuComponent {
  
  loggedInUser$: Observable<User | null>;
  mobileMenuOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    public documentService: DocumentService,
    public storeService: StoreService
  ) {
    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      map(apiAuthResponse => apiAuthResponse ?? null),
      map(userToken => userToken?.user!)
    );
  }

  logout() {
    this.authService.logout();
  }

  toggleMobileMenu() {
    this.mobileMenuOpened$.next(!this.mobileMenuOpened$.value);
  }
}
