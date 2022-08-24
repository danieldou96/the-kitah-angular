import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { filter, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { ShopService } from 'src/app/core/services/shop/shop.service';
import { categoryToFilterItem } from 'src/app/shared/models/category';
import { IFilterItem } from 'src/app/shared/models/filter';

@UntilDestroy()
@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss'],
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
export class FiltersSidebarComponent {

  filtersForm: QueryParamGroup;

  grades$: Observable<IFilterItem[]>;
  subjects$: Observable<IFilterItem[]>;
  resourceTypes$: Observable<IFilterItem[]>;

  constructor(
    private apiService: ApiService,
    private qpb: QueryParamBuilder,
    public shopService: ShopService,
    private router: Router
  ) {
    /*this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
      untilDestroyed(this)
    ).subscribe(() => {
      this.shopService.filtersSidebarOpened$.next(false);
    });*/
    
    this.grades$ = this.apiService.getGrades().pipe(
      map(grades => categoryToFilterItem(grades))
    );
    this.subjects$ = this.apiService.getSubjects().pipe(
      map(subjects => categoryToFilterItem(subjects))
    );
    this.resourceTypes$ = this.apiService.getResourceTypes().pipe(
      map(resourceTypes => categoryToFilterItem(resourceTypes))
    );


    this.filtersForm = this.qpb.group({
      grades: this.qpb.param('grades', {
        serialize: grades => grades?.join(','),
        deserialize: value => value?.split(',')
      }),
      subjects: this.qpb.param('subjects', {
        serialize: subjects => subjects?.join(','),
        deserialize: value => value?.split(',')
      }),
      resourceTypes: this.qpb.param('resourceTypes', {
        serialize: resourceTypes => resourceTypes?.join(','),
        deserialize: value => value?.split(',')
      }),
      priceRange: this.qpb.stringParam('priceRange'),
      search: this.qpb.stringParam('search')
    }, {
      clearOnDestroy: true,
    });
  }
}
