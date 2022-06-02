import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent {

  title$: Observable<string>;
  loggedInUser$: Observable<User | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(route.root.firstChild)
        console.log(this.route?.root?.firstChild?.snapshot.data);
      }
    });
    this.title$ = this.route.data.pipe(
      map(data => data['title'])
    );
    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      map(apiAuthResponse => apiAuthResponse ?? null),
      map(userToken => userToken?.user!)
    );
  }

  logout() {
    this.authService.logout();
  }
}
