import { Component, Input, OnInit } from '@angular/core';
import { IGalleryItem } from 'src/app/shared/models/gallery-item';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  @Input() items: IGalleryItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
