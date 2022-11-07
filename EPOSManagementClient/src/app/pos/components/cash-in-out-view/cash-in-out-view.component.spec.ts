import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInOutViewComponent } from './cash-in-out-view.component';

describe('CashInOutViewComponent', () => {
  let component: CashInOutViewComponent;
  let fixture: ComponentFixture<CashInOutViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashInOutViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInOutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
