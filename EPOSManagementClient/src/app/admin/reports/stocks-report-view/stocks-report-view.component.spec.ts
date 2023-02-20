import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksReportViewComponent } from './stocks-report-view.component';

describe('StocksReportViewComponent', () => {
  let component: StocksReportViewComponent;
  let fixture: ComponentFixture<StocksReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
