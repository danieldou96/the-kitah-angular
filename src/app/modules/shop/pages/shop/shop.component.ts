import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { map, Observable, take } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { categoryToFilterItem } from 'src/app/shared/models/category';
import { IFilterItem } from 'src/app/shared/models/filter';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { IProduct } from 'src/app/shared/models/product';
import { ShopFilters, ShopPageRequest } from 'src/app/shared/models/shop';
import { getAllNumbersBetween } from 'src/app/shared/utils';

@UntilDestroy()
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public currentPage!: Page<IProduct, ShopPageRequest>;
  public currentFilters!: ShopFilters;

  filtersForm: QueryParamGroup;

  grades$: Observable<IFilterItem[]>;
  subjects$: Observable<IFilterItem[]>;
  resourceTypes$: Observable<IFilterItem[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private qpb: QueryParamBuilder,
    public cartService: CartService,
    private _productsService: ProductsService
  ) {
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
      grades: qpb.param('grades', {
        serialize: grades => grades?.join(','),
        deserialize: value => value?.split(',')
      }),
      subjects: qpb.param('subjects', {
        serialize: subjects => subjects?.join(','),
        deserialize: value => value?.split(',')
      }),
      resourceTypes: qpb.param('resourceTypes', {
        serialize: resourceTypes => resourceTypes?.join(','),
        deserialize: value => value?.split(',')
      }),
      priceRange: qpb.stringParam('priceRange')
    });
  }

  ngOnInit() {
    this.filtersForm.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(filterValues => {
      const grades = filterValues['grades'];
      const subjects = filterValues['subjects'];
      const resourceTypes = filterValues['resourceTypes'];
      const priceRange = filterValues['priceRange'];

      this.currentFilters = {
        ...(grades?.length! > 0 && { grades }),
        ...(subjects?.length! > 0 && { subjects }),
        ...(resourceTypes?.length! > 0 && { resourceTypes }),
        ...(priceRange && { priceRange })
      };
      this._fetchPageOfProducts(new ShopPageRequest(this.currentFilters, 1));
    });
  }

  isLinkActive(url: string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
 }

  get pageNumbers() {
    return getAllNumbersBetween(this.currentPage?.totalPages!);
  }

  public nextPage(): void {
    this._fetchPageOfProducts(new ShopPageRequest(this.currentFilters, this.currentPage.next?.page, this.currentPage.next?.size, this.currentPage.next?.sort));
  }

  public prevPage(): void {
    this._fetchPageOfProducts(new ShopPageRequest(this.currentFilters, this.currentPage.previous?.page, this.currentPage.previous?.size, this.currentPage.previous?.sort));
  }

  private _fetchPageOfProducts(pageRequest?: ShopPageRequest): void {
    this._productsService.findAllPaginated(pageRequest).pipe(
      take(1)
    ).subscribe(page => {
      this.router.navigate(['/shop'], {
        queryParams: {
          page: page.current?.page
        },
        queryParamsHandling: 'merge'
      });
      this.currentPage = page;
    });
  }

  resetFilters() {
    this.router.navigate(['/shop'], {
      queryParams: {
        grades: null,
        subjects: null,
        resourceTypes: null,
        priceRange: null
      },
      queryParamsHandling: 'merge'
    });
  }
}
