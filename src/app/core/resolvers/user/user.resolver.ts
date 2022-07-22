import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<User>> {

  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.profile().pipe(
      first()
    );
  }
}