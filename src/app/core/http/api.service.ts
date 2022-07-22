import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { ICartItem, IGrade, IRecentlyViewedProductItem, IResourceType, IStore, ISubject } from 'src/app/shared/models/product';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { SortDirection } from 'src/app/shared/models/pagination/sort-direction.enum';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { CartItem } from '../services/cart/cart.service';
import { IBilling, User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // -------------------------------------------------------------------------------------
	// Categories
	// -------------------------------------------------------------------------------------

  public uploadAvatar(avatarFile: File): Observable<string> {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const url = `${this.apiUrl}/users/upload_avatar`;
    return this.http.post<ApiResponse>(url, formData).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as string)
    );
  }
  
  public uploadBanner(bannerFile: File): Observable<string> {
    const formData = new FormData();
    formData.append("banner", bannerFile);

    const url = `${this.apiUrl}/store/upload_banner`;
    return this.http.post<ApiResponse>(url, formData).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as string)
    );
  }

  /** @description Get updates list to be on the homepage */
  public updateAccountDetails(id: number, accountDetailsForm: any): Observable<User> {
    const url = this.apiUrl + `/users/${id}`;
    return this.http.put<User>(url, { ...accountDetailsForm });
  }

  /** @description Get updates list to be on the homepage */
  public updateStoreDetails(id: number, storeDetailsForm: any): Observable<IStore> {
    const url = this.apiUrl + `/store/${id}`;
    return this.http.put<IStore>(url, { ...storeDetailsForm });
  }

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

  /** @description Get updates list to be on the homepage */
  public getStoreByUrl(storeUrl: string): Observable<IStore> {
    const url = this.apiUrl + `/store/${storeUrl}`;
    return this.http.get<ApiResponse>(url, {
      context: withCache()
    }).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IStore)
    );
  }

  /** @description Get updates list to be on the homepage */
  public getMyStore(): Observable<IStore> {
    const url = this.apiUrl + `/auth/store`;
    return this.http.get<IStore>(url, {
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
    return this.http.get<ApiResponse<{
      featuredProducts: IProduct[];
      monthlyProducts: IProduct[];
      recentlyViewedProducts: IProduct[];
    }>>(url, {
      context: withCache()
    }).pipe(
      map(apiResponse => apiResponse.data)
    );
  }

  /** @description Get updates list to be on the homepage */
  public getHomepageStats(): Observable<{
    products: number;
    vendors: number;
    members: number;
  }> {
    const url = this.apiUrl + `/homepage/stats`;
    return this.http.get<ApiResponse>(url, {
      context: withCache()
    }).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as {
        products: number;
        vendors: number;
        members: number;
      })
    );
  }

  /** @description Get updates list to be on the homepage */
  public downloadProductFile(productId: number): Observable<Blob> {
    const url = this.apiUrl + `/orders/download/${productId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  /** @description Get updates list to be on the homepage */
  public exportSalesReport(): Observable<Blob> {
    const url = this.apiUrl + `/store/sales-report`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // -------------------------------------------------------------------------------------
	// Wishlist
	// -------------------------------------------------------------------------------------

  /** @description Get updates list to be on the homepage */
  public getWishlist(): Observable<IProduct[]> {
    const url = this.apiUrl + `/wishlist`;
    return this.http.get<ApiResponse>(url).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IProduct[])
    );
  }

  /** @description Get updates list to be on the homepage */
  public updateWishlist(wishlistItems: IProduct[]): Observable<any> {
    const url = this.apiUrl + `/wishlist/update`;
    return this.http.put(url, {
      productIds: wishlistItems.map(i => i.id)
    });
  }

  // -------------------------------------------------------------------------------------
	// Favorite Sellers
	// -------------------------------------------------------------------------------------

  /** @description Get updates list to be on the homepage */
  public getFavoriteSellers(): Observable<IStore[]> {
    const url = this.apiUrl + `/favorite-sellers`;
    return this.http.get<ApiResponse>(url).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IStore[])
    );
  }

  /** @description Get updates list to be on the homepage */
  public updateFavoriteSellers(favoriteSellers: IStore[]): Observable<any> {
    const url = this.apiUrl + `/favorite-sellers/update`;
    return this.http.put(url, {
      storeIds: favoriteSellers.map(i => i.id)
    });
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
  public getRecentlyViewedProducts(): Observable<IRecentlyViewedProductItem[]> {
    const url = this.apiUrl + `/recently-viewed-products`;
    return this.http.get<ApiResponse>(url).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IRecentlyViewedProductItem[])
    );
  }

  /** @description Get updates list to be on the homepage */
  public getUserBilling(): Observable<IBilling> {
    const url = this.apiUrl + `/users/billing`;
    return this.http.get<ApiResponse>(url).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IBilling)
    );
  }

  /** @description Get updates list to be on the homepage */
  public getStripeDashboardLink(): Observable<string> {
    const url = this.apiUrl + `/store/stripe-dashboard`;
    return this.http.get<ApiResponse<string>>(url).pipe(
      map(apiResponse => apiResponse.data)
    );
  }

  /** @description Get updates list to be on the homepage */
  public checkIfStripeDetailsSubmitted(): Observable<boolean> {
    const url = this.apiUrl + `/store/stripe-details-submitted`;
    return this.http.get<ApiResponse<boolean>>(url, {
      context: withCache()
    }).pipe(
      map(apiResponse => apiResponse.data)
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
  public updateRecentlyViewedProducts(recentlyViewedProductItems: IRecentlyViewedProductItem[]): Observable<any> {
    const url = this.apiUrl + `/recently-viewed-products/update`;
    return this.http.put(url, {
      recentlyViewedProductItems: recentlyViewedProductItems.map(i => ({
        productId: i.product.id
      }))
    });
  }

  /** @description Get updates list to be on the homepage */
  public stripeAccountLink(): Observable<string> {
    const url = this.apiUrl + `/store/stripe_refresh`;
    return this.http.post<ApiResponse<string>>(url, {}).pipe(
      map(apiResponse => apiResponse.data)
    );
  }

  /** @description Get updates list to be on the homepage */
  public submitReview(productId: number, reviewForm: { rate: number; text: string; }): Observable<any> {
    const url = this.apiUrl + `/reviews/`;
    return this.http.post<ApiResponse>(url, {
      productId,
      ...reviewForm
    });
  }

  /** @description Get updates list to be on the homepage */
  public checkout(token: string | undefined, checkoutForm: any): Observable<number> {
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

  /** @description Get updates list to be on the homepage */
  public migrateAccount(migrationForm: any): Observable<any> {
    const url = this.apiUrl + `/users/migration`;
    return this.http.post(url, { ...migrationForm });
  }
}
