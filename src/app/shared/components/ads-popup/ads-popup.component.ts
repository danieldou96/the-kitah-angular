import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-ads-popup',
  templateUrl: './ads-popup.component.html',
  styleUrls: ['./ads-popup.component.scss']
})
export class AdsPopupComponent {

  submitted = false;
  subscribed = false;
  email = new FormControl(null, [Validators.required, Validators.email]);

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AdsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      description: string;
      buttonLabel: string;
      declineText: string;
    }
  ) { }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.submitted = true;

    if (this.email.invalid) {
      return;
    }

    this.apiService.subscribeEmail(this.email.value!).pipe(
      take(1)
    ).subscribe(() => this.subscribed = true);
  }
}
