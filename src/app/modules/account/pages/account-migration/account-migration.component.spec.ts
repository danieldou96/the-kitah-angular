import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMigrationComponent } from './account-migration.component';

describe('AccountMigrationComponent', () => {
  let component: AccountMigrationComponent;
  let fixture: ComponentFixture<AccountMigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMigrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
