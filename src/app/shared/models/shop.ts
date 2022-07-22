import { PageRequest } from "./pagination/page-request.model";
import { Sort } from "./pagination/sort.model";

export interface ShopFilters {
	grades?: string[];
	subjects?: string[];
	resourceTypes?: string[];
	priceRange?: string;
	search?: string;
}

export class ShopPageRequest extends PageRequest {
	public filters: ShopFilters;

  constructor(filters: ShopFilters = {}, page: number = 1, size: number = 10, sort: Sort = new Sort()) {
		super(page, size, sort);
		this.filters = filters;
	}

  public override next(totalElements:number): ShopPageRequest {
    const totalPages: number = Math.ceil(totalElements / this.size) || 1;
    const nextPage: number = +this.page === totalPages ? 1 : +this.page + 1;
    return new ShopPageRequest({}, nextPage, this.size, this.sort);
  }

  public override previous(totalElements: number): ShopPageRequest {
    const totalPages: number = Math.ceil(totalElements / this.size || 1);
    const previousPage: number = +this.page=== 1 ? totalPages : +this.page- 1;
    return new ShopPageRequest({}, previousPage, this.size, this.sort);
  }

  public static override from(page: number, size: number, sortColumn: string, sortDirection: string): ShopPageRequest {
    const sort: Sort = Sort.from(sortColumn, sortDirection);
    return new ShopPageRequest({}, page, size, sort);
  }

  public static fromWithFilters(filters: ShopFilters = {}, page: number, size: number, sortColumn: string, sortDirection: string): ShopPageRequest {
    const sort: Sort = Sort.from(sortColumn, sortDirection);
    return new ShopPageRequest(filters, page, size, sort);
  }
}