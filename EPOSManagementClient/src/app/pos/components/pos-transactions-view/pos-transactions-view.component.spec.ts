import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTransactionsViewComponent } from './pos-transactions-view.component';

describe('PosTransactionsViewComponent', () => {
  let component: PosTransactionsViewComponent;
  let fixture: ComponentFixture<PosTransactionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosTransactionsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTransactionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
