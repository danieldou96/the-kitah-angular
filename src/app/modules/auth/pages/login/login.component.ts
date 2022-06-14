import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/core/authentication/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword = new FormControl(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false)
    });
  }

  ngOnInit() {
    if (this.authService.loggedInUser) {
      this.router.navigateByUrl('my-account');
    }
  }

  login() {
    this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).pipe(
      untilDestroyed(this)
    ).subscribe(t=>console.log(t));
  }

}
