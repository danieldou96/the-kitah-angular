import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGrade, IResourceType, ISubject } from 'src/app/shared/models/product';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  grades$: Observable<IGrade[]>;
  subjects$: Observable<ISubject[]>;
  resourceTypes$: Observable<IResourceType[]>;

  constructor(
    private apiService: ApiService
  ) {
    this.grades$ = this.apiService.getGrades();
    this.subjects$ = this.apiService.getSubjects();
    this.resourceTypes$ = this.apiService.getResourceTypes();
  }
}
