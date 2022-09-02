import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private router: Router,
    private hotToastService: HotToastService
  ) { }

  ngOnInit() {
    this.hotToastService.success('Email successfully verified!');
    this.router.navigateByUrl('/');
  }
}
