import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { first } from 'rxjs';
import slugify from 'slugify';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { countries, IState, StatesAU, StatesCA, StatesUS } from 'src/app/shared/data/phone-country-code';

@UntilDestroy()
@Component({
  selector: 'app-account-migration',
  templateUrl: './account-migration.component.html',
  styleUrls: ['./account-migration.component.scss']
})
export class AccountMigrationComponent implements OnInit {

  migrationForm!: FormGroup;
  countries = countries;
  UsStates = StatesUS;
  AuStates = StatesAU;
  CaStates = StatesCA;
  states: IState[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private hotToastService: HotToastService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.migrationForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      url: new FormControl('', [Validators.required, Validators.minLength(4)]),
      phone: new FormControl('', [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      zipcode: new FormControl(null ?? undefined),
      city: new FormControl(null ?? undefined),
      state: new FormControl(null ?? undefined),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });

    this.formControls['name'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe((val: string) => {
      this.formControls['url'].setValue(slugify(val, {
        lower: true,
        strict: true,
        trim: true
      }), { emitEvent: false });
    });

    this.formControls['url'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe((val: string) => {
      this.formControls['url'].setValue(slugify(val, {
        lower: true,
        strict: true,
        trim: true
      }), { emitEvent: false });
    });
    
    this.formControls['country'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(country => {
      if (country == 'US') {
        this.states = this.UsStates;
      } else if (country == 'CA') {
        this.states = this.CaStates;
      } else if (country == 'AU') {
        this.states = this.AuStates;
      } else {
        this.states = [];
      }
      this.formControls['state'].reset();
    });
  }

  get formControls() {
    return this.migrationForm.controls;
  }

  submit() {
    if (this.migrationForm.invalid) {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.apiService.migrateAccount(this.migrationForm.value).pipe(
      first()
    ).subscribe(() => {
      this.hotToastService.success('Success! You are now a seller. Please log in again.');
      this.authService.logout();
    });
  }

}
