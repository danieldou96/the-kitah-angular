import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from '../services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  stickyHeader$: Observable<boolean>;

  constructor(private headerService: HeaderService) {
    this.stickyHeader$ = this.headerService.stickyHeader$;
  }

  ngOnInit(): void {
  }

}
