import { TestBed } from '@angular/core/testing';

import { AdsPopupService } from './ads-popup.service';

describe('AdsPopupService', () => {
  let service: AdsPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
