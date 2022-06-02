export interface IGalleryItem {
	previewImage?: string;
	thumbImage?: string;
	fullImage: string;
	fileSize: number;
	fileName: string;
	createdAt?: Date;
	updatedAt?: Date;
}