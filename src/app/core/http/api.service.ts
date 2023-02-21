import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { IGrade, IProduct, IResourceType, IStore, ISubject, ICartItem } from 'src/app/shared/models/product';
import { Page } from 'src/app/shared/models/pagination/page.model';
import { SortDirection } from 'src/app/shared/models/pagination/sort-direction.enum';
import { environment } from 'src/environments/environment';
import { IBilling, User } from 'src/app/shared/models/user';
import { StripeCard } from 'src/app/modules/shop/components/select-saved-cards/select-saved-cards.component';

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
    return this.http.post<ApiResponse<string>>(url, formData).pipe(map(apiResponse => apiResponse.data));
  }
  
  public uploadBanner(bannerFile: File): Observable<string> {
    const formData = new FormData();
    formData.append("banner", bannerFile);

    const url = `${this.apiUrl}/store/upload_banner`;
    return this.http.post<ApiResponse<string>>(url, formData).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public updateAccountDetails(id: number, accountDetailsForm: any): Observable<User> {
    const url = this.apiUrl + `/users/${id}`;
    return this.http.put<ApiResponse<User>>(url, { ...accountDetailsForm }).pipe(
      map(apiResponse => apiResponse.data)
    );
  }

  /** @description Get updates list to be on the homepage */
  public updateStoreDetails(id: number, storeDetailsForm: any): Observable<IStore> {
    const url = this.apiUrl + `/store/${id}`;
    return this.http.put<ApiResponse<IStore>>(url, { ...storeDetailsForm }).pipe(
      map(apiResponse => apiResponse.data)
    );
  }

  /** @description Get updates list to be on the homepage */
  public getGrades(): Observable<IGrade[]> {
    const url = this.apiUrl + `/grades`;
    return this.http.get<ApiResponse<IGrade[]>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getSubjects(): Observable<ISubject[]> {
    const url = this.apiUrl + `/subjects`;
    return this.http.get<ApiResponse<ISubject[]>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getResourceTypes(): Observable<IResourceType[]> {
    const url = this.apiUrl + `/resource-types`;
    return this.http.get<ApiResponse<IResourceType[]>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getStoreByUrl(storeUrl: string): Observable<IStore> {
    const url = this.apiUrl + `/store/${storeUrl}`;
    return this.http.get<ApiResponse<IStore>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getMyStore(): Observable<IStore> {
    const url = this.apiUrl + `/auth/store`;
    return this.http.get<ApiResponse<IStore>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
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
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getHomepageStats(): Observable<{
    products: number;
    vendors: number;
    members: number;
  }> {
    const url = this.apiUrl + `/homepage/stats`;
    return this.http.get<ApiResponse<{
      products: number;
      vendors: number;
      members: number;
    }>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
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
    return this.http.get<ApiResponse<IProduct[]>>(url).pipe(map(apiResponse => apiResponse.data));
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
    return this.http.get<ApiResponse<IStore[]>>(url).pipe(map(apiResponse => apiResponse.data));
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
    return this.http.get<ApiResponse<ICartItem[]>>(url).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getRecentlyViewedProducts(): Observable<IProduct[]> {
    const url = this.apiUrl + `/recently-viewed-products`;
    return this.http.get<ApiResponse<IProduct[]>>(url).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getUserBilling(): Observable<IBilling> {
    const url = this.apiUrl + `/users/billing`;
    return this.http.get<ApiResponse<IBilling>>(url).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getStripeDashboardLink(): Observable<ApiResponse<string>> {
    const url = this.apiUrl + `/store/stripe-dashboard`;
    return this.http.get<ApiResponse<string>>(url);
  }

  /** @description Get updates list to be on the homepage */
  public checkIfStripeDetailsSubmitted(): Observable<boolean> {
    const url = this.apiUrl + `/store/stripe-details-submitted`;
    return this.http.get<ApiResponse<boolean>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public updateShoppingCart(cartItems: ICartItem[]): Observable<any> {
    const url = this.apiUrl + `/cart/update`;
    return this.http.put(url, {
      cartItems: cartItems.map(i => ({
        productId: i.product.id
      }))
    });
  }

  /** @description Get updates list to be on the homepage */
  public updateRecentlyViewedProducts(recentlyViewedProductIds: IProduct[]): Observable<any> {
    const url = this.apiUrl + `/recently-viewed-products/update`;
    return this.http.put(url, {
      products: recentlyViewedProductIds.map(product => ({
        productId: product.id
      }))
    });
  }

  /** @description Get updates list to be on the homepage */
  public verifyEmail(link: string): Observable<boolean> {
    const url = this.apiUrl + `/users/verify`;
    return this.http.post<ApiResponse<boolean>>(url, {
      link
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public subscribeEmail(email: string): Observable<any> {
    const url = this.apiUrl + `/homepage/subscribe`;
    return this.http.post<ApiResponse<any>>(url, {
      email
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public resetPassword(link: string, password: string): Observable<boolean> {
    const url = this.apiUrl + `/auth/reset-password`;
    return this.http.post<ApiResponse<boolean>>(url, {
      link, password
    }).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public forgotPassword(email: string): Observable<any> {
    const url = this.apiUrl + `/auth/forgot-password`;
    return this.http.post<ApiResponse>(url, {
      email
    });
  }

  /** @description Get updates list to be on the homepage */
  public stripeAccountLink(): Observable<string> {
    const url = this.apiUrl + `/store/stripe_refresh`;
    return this.http.post<ApiResponse<string>>(url, {}).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public sendContactForm(contactForm: any): Observable<any> {
    const url = this.apiUrl + `/contact`;
    return this.http.post(url, contactForm);
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
  public checkout(checkoutForm: any): Observable<number> {
    const url = this.apiUrl + `/checkout`;
    return this.http.post<ApiResponse<number>>(url, checkoutForm).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public getStripeIntentSecret(): Observable<string> {
    const url = this.apiUrl + `/checkout/secret`;
    return this.http.post<ApiResponse<string>>(url, {}).pipe(
      map(apiResponse => apiResponse.data)
    );
  }

  /** @description Get updates list to be on the homepage */
  public getSavedCards(): Observable<StripeCard[]> {
    const url = `${this.apiUrl}/payment/saved-cards`;
    return this.http.post<ApiResponse<any[]>>(url, {}).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public deleteSavedCard(cardId: string): Observable<any> {
    const url = `${this.apiUrl}/payment/delete-card/${cardId}`;
    return this.http.delete<ApiResponse<any>>(url).pipe(map(apiResponse => apiResponse.data));
  }

  /** @description Get updates list to be on the homepage */
  public migrateAccount(migrationForm: any): Observable<any> {
    const url = this.apiUrl + `/users/migration`;
    return this.http.post(url, { ...migrationForm });
  }
}
