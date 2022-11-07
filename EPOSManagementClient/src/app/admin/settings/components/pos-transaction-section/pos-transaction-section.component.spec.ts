import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTransactionSectionComponent } from './pos-transaction-section.component';

describe('PosTransactionSectionComponent', () => {
  let component: PosTransactionSectionComponent;
  let fixture: ComponentFixture<PosTransactionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosTransactionSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTransactionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
