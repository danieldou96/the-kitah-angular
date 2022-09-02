import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { first } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private hotToastService: HotToastService
  ) {
    this.contactForm = this.fb.group({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.apiService.sendContactForm(this.contactForm.value).pipe(
      first()
    ).subscribe(() => {
      this.contactForm.reset();
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.setErrors(null);
      });
      this.hotToastService.success('Your message has been sent.');
    });
  }
}
