import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FilterItem } from 'src/app/shared/models/filter';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  filtersForm: FormGroup;
  grades$: Observable<FilterItem[]>;
  subjects$: Observable<FilterItem[]>;
  ressourceTypes$: Observable<FilterItem[]>;

  constructor(
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      grades: new FormControl([]),
      subjects: new FormControl([]),
      ressourceTypes: new FormControl([])
    });
    this.grades$ = of([
      {
        text: '1st',
        value: '1st'
      },
      {
        text: '2nd',
        value: '2nd'
      },
      {
        text: '3rd',
        value: '3rd'
      }
    ] as FilterItem[]);
    this.subjects$ = of([
      {
        text: 'Classroom Basics/starter kit',
        value: 'Classroom Basics/starter kit'
      },
      {
        text: 'Classroom Decor',
        value: 'Classroom Decor'
      },
      {
        text: 'Clip art',
        value: 'Clip art'
      }
    ] as FilterItem[]);
    this.ressourceTypes$ = of([
      {
        text: 'Activity',
        value: 'Activity'
      },
      {
        text: 'Assessment',
        value: 'Assessment'
      },
      {
        text: 'Booklet',
        value: 'Booklet'
      }
    ] as FilterItem[]);
  }

  ngOnInit(): void {
    this.filtersForm.valueChanges.subscribe(t=>console.log(t))
  }

}
