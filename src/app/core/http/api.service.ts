import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { ICartItem, IGrade, IResourceType, ISubject } from 'src/app/shared/models/product';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { SortDirection } from 'src/app/shared/models/pagination/sort-direction.enum';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { CartItem } from '../services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // -------------------------------------------------------------------------------------
	// Categories
	// -------------------------------------------------------------------------------------

  /** @description Get updates list to be on the homepage */
  public getGrades(): Observable<IGrade[]> {
    const url = this.apiUrl + `/grades`;
    return this.http.get<IGrade[]>(url, {
      context: withCache()
    });
  }

  /** @description Get updates list to be on the homepage */
  public getSubjects(): Observable<ISubject[]> {
    const url = this.apiUrl + `/subjects`;
    return this.http.get<ISubject[]>(url, {
      context: withCache()
    });
  }

  /** @description Get updates list to be on the homepage */
  public getResourceTypes(): Observable<IResourceType[]> {
    const url = this.apiUrl + `/resource-types`;
    return this.http.get<IResourceType[]>(url, {
      context: withCache()
    });
  }

  // -------------------------------------------------------------------------------------
	// Homepage
	// -------------------------------------------------------------------------------------

  /** @description Get updates list to be on the homepage */
  public getHomepageProducts(): Observable<{
    featuredProducts: IProduct[];
    monthlyProducts: IProduct[];
    recentlyViewedProducts: IProduct[];
  }> {
    const url = this.apiUrl + `/homepage/products`;
    return this.http.get<ApiResponse>(url, {
      context: withCache()
    }).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as {
        featuredProducts: IProduct[];
        monthlyProducts: IProduct[];
        recentlyViewedProducts: IProduct[];
      })
    );
  }

  /** @description Get updates list to be on the homepage */
  public downloadProductFile(productId: number): Observable<Blob> {
    const url = this.apiUrl + `/orders/download/${productId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // -------------------------------------------------------------------------------------
	// Shopping Cart
	// -------------------------------------------------------------------------------------

  /** @description Get updates list to be on the homepage */
  public getShoppingCart(): Observable<ICartItem[]> {
    const url = this.apiUrl + `/cart`;
    return this.http.get<ApiResponse>(url).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as ICartItem[])
    );
  }

  /** @description Get updates list to be on the homepage */
  public updateShoppingCart(cartItems: CartItem[]): Observable<any> {
    const url = this.apiUrl + `/cart/update`;
    return this.http.put(url, {
      cartItems: cartItems.map(i => ({
        productId: i.product.id,
        quantity: i.quantity
      }))
    });
  }

  /** @description Get updates list to be on the homepage */
  public checkout(token: string, checkoutForm: any): Observable<number> {
    const url = this.apiUrl + `/checkout`;
    return this.http.post<ApiResponse>(url, {
      token,
      ...checkoutForm
    }).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as number)
    );
  }

  /** @description Get updates list to be on the homepage */
  public getStripeIntentSecret(): Observable<any> {
    const url = this.apiUrl + `/checkout/secret`;
    return this.http.post(url, {});
  }
}
