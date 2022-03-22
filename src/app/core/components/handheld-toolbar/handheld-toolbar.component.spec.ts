import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandheldToolbarComponent } from './handheld-toolbar.component';

describe('HandheldToolbarComponent', () => {
  let component: HandheldToolbarComponent;
  let fixture: ComponentFixture<HandheldToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandheldToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandheldToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
