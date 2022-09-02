import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { first } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { DocumentService } from 'src/app/core/services/document/document.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email = new FormControl(null, [Validators.required, Validators.email]);

  constructor(
    private apiService: ApiService,
    private hotToastService: HotToastService,
    private documentService: DocumentService
  ) {
  }

  submit() {
    if (!this.email.valid) {
      this.documentService.scrollToError();
      return;
    }

    this.apiService.forgotPassword(this.email.value!).pipe(
      first()
    ).subscribe(() => {
      this.hotToastService.success('A password reset email has been sent to you.');
      this.email.reset();
      this.email.setErrors(null);
    });
  }
}
