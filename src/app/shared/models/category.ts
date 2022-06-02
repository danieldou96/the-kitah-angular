import { IFilterItem } from "./filter";
import { IGrade, IResourceType, ISubject } from "./product";

/*export interface IGrade {
	name: string;
	slug: string;
	sort: number;
}

export interface ISubject {
	name: string;
	slug: string;
	sort: number;
	children: ISubject[];
}

export interface IResourceType {
	name: string;
	slug: string;
	sort: number;
}*/

export function categoryToFilterItem(categories: IGrade[] | ISubject[] | IResourceType[]): IFilterItem[] {
	return categories.map(category => <IFilterItem>{
		text: category.name,
		value: category.slug,
		...('children' in category && {
			children: categoryToFilterItem(category.children)
		})
	});
}