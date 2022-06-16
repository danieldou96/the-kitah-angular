import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter } from 'rxjs';
import { HeaderService } from '../services/header/header.service';

@UntilDestroy()
@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
        overflow: 'hidden',
        paddingLeft: '1rem',
        opacity: 1,
        height: '*'
      })),
      state('false', style({
        overflow: 'hidden',
        paddingLeft: '0px',
        opacity: 0,
        height: '0px'
      })),
      transition('true => false', animate('.3s ease-in-out')),
      transition('false => true', animate('.3s ease-in-out'))
    ])
  ],
})
export class MobileSidebarComponent {

  gradesExpanded$ = new BehaviorSubject<boolean>(false);
  subjectsExpanded$ = new BehaviorSubject<boolean>(false);

  constructor(
    public headerService: HeaderService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
      untilDestroyed(this)
    ).subscribe(() => {
      this.gradesExpanded$.next(false);
      this.subjectsExpanded$.next(false);
      this.headerService.mobileSidebarOpened$.next(false);
    });
  }
}
