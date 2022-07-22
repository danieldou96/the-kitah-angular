import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-resume-stripe-form',
  templateUrl: './resume-stripe-form.component.html',
  styleUrls: ['./resume-stripe-form.component.scss']
})
export class ResumeStripeFormComponent {

  constructor(
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window
  ) { }

  resumeStripeForm() {
    this.window.location.href = this.route.snapshot.data['stripeAccountLink'];
  }
}
