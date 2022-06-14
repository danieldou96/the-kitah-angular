import { Component, Input } from '@angular/core';
import { DocumentService } from 'src/app/core/services/document/document.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent {

  @Input() products!: IProduct[];
  @Input() maxPerRow: number = 4;
  @Input() slider = false;
  @Input() centered = false;

  constructor(public documentService: DocumentService) { }
}
