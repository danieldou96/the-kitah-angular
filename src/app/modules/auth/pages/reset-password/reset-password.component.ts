import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { first } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { DocumentService } from 'src/app/core/services/document/document.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  password = new FormControl(null, [Validators.required, Validators.minLength(8)]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private hotToastService: HotToastService,
    private apiService: ApiService
  ) { }

  submit() {
    if (!this.password.valid) {
      this.documentService.scrollToError();
      return;
    }

    this.apiService.resetPassword(this.route.snapshot.params['link'], this.password.value!).pipe(
      first()
    ).subscribe(() => {
      this.hotToastService.success('Password successfully updated. You can now log in.');
      this.router.navigateByUrl('/auth/login');
    });
  }
}
