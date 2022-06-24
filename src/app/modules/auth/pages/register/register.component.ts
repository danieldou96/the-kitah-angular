import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ERoles } from 'src/app/shared/enums/user';
import { conditionalValidator } from 'src/app/shared/validators/validators';
import slugify from 'slugify';

@UntilDestroy()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.loggedInUser) {
      this.router.navigateByUrl('my-account');
    }

    this.registerForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      registrationType: new FormControl(ERoles.Buyer, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      //confirmPassword: new FormControl('', [Validators.required]),
      shopName: new FormControl('', [
        conditionalValidator(
          () => this.registerForm.controls['registrationType'].value == ERoles.Vendor,
          [Validators.required, Validators.minLength(4)]
        )
      ]),
      shopUrl: new FormControl('', [
        conditionalValidator(
          () => this.registerForm.controls['registrationType'].value == ERoles.Vendor,
          [Validators.required, Validators.minLength(4)]
        )
      ]),
      phone: new FormControl('', [
        conditionalValidator(
          () => this.registerForm.controls['registrationType'].value == ERoles.Vendor,
          [Validators.required]
        )
      ]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });

    this.formControls['registrationType'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.formControls['shopName'].updateValueAndValidity({ emitEvent: false });
      this.formControls['shopUrl'].updateValueAndValidity({ emitEvent: false });
      this.formControls['phone'].updateValueAndValidity({ emitEvent: false });
    });

    this.formControls['shopName'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe((val: string) => {
      this.formControls['shopUrl'].setValue(slugify(val, {
        lower: true,
        strict: true,
        trim: true
      }), { emitEvent: false });
    });

    this.formControls['shopUrl'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe((val: string) => {
      this.formControls['shopUrl'].setValue(slugify(val, {
        lower: true,
        strict: true,
        trim: true
      }), { emitEvent: false });
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    console.log(this.registerForm)
    if (this.registerForm.invalid) {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.authService.register(this.registerForm.value).pipe(
      untilDestroyed(this)
    ).subscribe();
  }

}
