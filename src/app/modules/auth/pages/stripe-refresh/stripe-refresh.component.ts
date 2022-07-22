import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-stripe-refresh',
  templateUrl: './stripe-refresh.component.html',
  styleUrls: ['./stripe-refresh.component.scss']
})
export class StripeRefreshComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.window.location.replace(this.route.snapshot.data['stripeAccountLink']);
  }
}
