export interface FilterItem {
	text: string;
	value: string | boolean | number;
	children?: FilterItem[];
}