import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSavedCardsComponent } from './select-saved-cards.component';

describe('SelectSavedCardsComponent', () => {
  let component: SelectSavedCardsComponent;
  let fixture: ComponentFixture<SelectSavedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSavedCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSavedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
