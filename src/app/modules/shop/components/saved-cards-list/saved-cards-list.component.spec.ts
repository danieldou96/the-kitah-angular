import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCardsListComponent } from './saved-cards-list.component';

describe('SavedCardsListComponent', () => {
  let component: SavedCardsListComponent;
  let fixture: ComponentFixture<SavedCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCardsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
