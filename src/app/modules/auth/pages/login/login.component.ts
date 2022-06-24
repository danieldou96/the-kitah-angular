import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false)
    });
  }

  ngOnInit() {
    if (this.authService.loggedInUser) {
      this.router.navigateByUrl('my-account');
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).pipe(
      untilDestroyed(this)
    ).subscribe();
  }

}
