export interface IProduct {
	title: string;
	gallery: IGalleryItem[];
}

export interface IGalleryItem {
	previewImage: string;
	thumbImage: string;
	fullImage: string;
}