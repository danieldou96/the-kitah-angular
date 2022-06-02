import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSellersComponent } from './favorite-sellers.component';

describe('FavoriteSellersComponent', () => {
  let component: FavoriteSellersComponent;
  let fixture: ComponentFixture<FavoriteSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteSellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
