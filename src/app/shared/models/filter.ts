export interface IFilterItem {
	text: string;
	value: string;
	children?: IFilterItem[];
}