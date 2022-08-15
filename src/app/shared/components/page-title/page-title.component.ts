import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
  @Input() title?: string;
  @Input() store?: boolean;
  @Input() avatar?: string;
  @Input() memberSince?: Date;
}
