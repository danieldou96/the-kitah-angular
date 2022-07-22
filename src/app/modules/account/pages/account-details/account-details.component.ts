import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  form!: FormGroup;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private hotToastService: HotToastService,
    private apiService: ApiService,
    public authService: AuthService
  ) {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  ngOnInit() {
    this.form = this.fb.group({
      avatar: new FormControl(this.user.avatar),
      firstname: new FormControl(this.user.firstname, [Validators.required]),
      lastname: new FormControl(this.user.lastname, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      username: new FormControl(this.user.username, [Validators.required]),
      currentPassword: new FormControl(null, [Validators.minLength(8)]),
      newPassword: new FormControl(null, [Validators.minLength(8)]),
    });
  }

  get formControls() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.apiService.updateAccountDetails(this.user.id!, this.form.value).pipe(
      first()
    ).subscribe(user => {
      this.user = user;
      this.form.patchValue(user);
      this.hotToastService.success('Success!');
    });
  }
}
