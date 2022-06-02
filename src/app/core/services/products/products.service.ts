import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { IFile, IProduct } from 'src/app/shared/models/product';
import { ShopFilters, ShopPageRequest } from 'src/app/shared/models/shop';
import { environment } from 'src/environments/environment';
import { AbstractCrudService } from '../crud/abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractCrudService<IProduct, number, ShopPageRequest> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.apiUrl}/products`)
  }

  override findAllPaginated(pageRequest?: ShopPageRequest): Observable<Page<IProduct, ShopPageRequest>> {
    const params: {[key: string]: any} = !pageRequest ? {} : { 
      pageNumber: pageRequest.page,
      pageSize: pageRequest.size,
      sortCol: pageRequest.sort.column,
      sortDir: pageRequest.sort.direction,
      ...(pageRequest.filters.grades?.length! > 0 && {
        grades: pageRequest.filters.grades?.join(',')
      }),
      ...(pageRequest.filters.subjects?.length! > 0 && {
        subjects: pageRequest.filters.subjects?.join(',')
      }),
      ...(pageRequest.filters.resourceTypes?.length! > 0 && {
        resourceTypes: pageRequest.filters.resourceTypes?.join(',')
      }),
      ...(pageRequest.filters.priceRange && {
        priceRange: pageRequest.filters.priceRange
      })
    };
    return this._http.get<Page<IProduct, ShopPageRequest>>(this._base, {
      params: params,
      context: withCache()
    });
  }
  
  /** @description Saves user registration to the Kinus */
  public uploadProductPreview(pictureFile: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", pictureFile);

    const url = `${environment.apiUrl}/products/upload/product_preview`;
    return this._http.post<ApiResponse>(url, formData).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as string)
    );
  }

  /** @description Saves user registration to the Kinus */
  public uploadProductFile(pictureFile: File, generateThumbnails: boolean = true): Observable<{ generatedThumbnails?: IFile[]; fileUrl: string; }> {
    const formData = new FormData();
    formData.append("file", pictureFile);
    formData.append("generateThumbnails", generateThumbnails.toString());

    const url = `${environment.apiUrl}/products/upload/product_file`;
    return this._http.post<ApiResponse>(url, formData).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as { generatedThumbnails?: IFile[]; fileUrl: string; })
    );
  }
}