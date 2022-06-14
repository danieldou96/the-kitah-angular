import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { conditionalValidator } from 'src/app/shared/validators/validators';

@UntilDestroy()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    if (this.authService.loggedInUser) {
      this.router.navigateByUrl('my-account');
    }
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      registrationType: new FormControl('buyer', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
      shopName: new FormControl('', [
        conditionalValidator(
          () => this.registerForm.controls['registrationType'].value == 'vendor',
          [Validators.required]
        )
      ]),
      shopUrl: new FormControl('', [
        conditionalValidator(
          () => this.registerForm.controls['registrationType'].value == 'vendor',
          [Validators.required]
        )
      ]),
      phone: new FormControl('', [
        conditionalValidator(
          () => this.registerForm.controls['registrationType'].value == 'vendor',
          [Validators.required]
        )
      ]),
      terms: new FormControl(false, [
        Validators.requiredTrue
      ]),
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(this.registerForm.value).pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.router.navigateByUrl('auth/login');
    });
  }

}
