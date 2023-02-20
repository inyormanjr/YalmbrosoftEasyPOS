import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportViewComponent } from './sales-report-view.component';

describe('SalesReportViewComponent', () => {
  let component: SalesReportViewComponent;
  let fixture: ComponentFixture<SalesReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
