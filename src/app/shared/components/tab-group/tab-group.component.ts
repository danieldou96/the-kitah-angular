import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

  @Output() readonly selectedTabChange = new EventEmitter<number>(true);

  constructor() { }

  ngOnInit(): void {
  }

}
