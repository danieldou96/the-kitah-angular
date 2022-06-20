import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  constructor(public authService: AuthService) { }
}
