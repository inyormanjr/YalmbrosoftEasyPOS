import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTransactionLineComponent } from './dashboard-transaction-line.component';

describe('DashboardTransactionLineComponent', () => {
  let component: DashboardTransactionLineComponent;
  let fixture: ComponentFixture<DashboardTransactionLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTransactionLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTransactionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
