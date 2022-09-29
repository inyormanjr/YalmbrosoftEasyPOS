import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCounterComponent } from './dashboard-counter.component';

describe('DashboardCounterComponent', () => {
  let component: DashboardCounterComponent;
  let fixture: ComponentFixture<DashboardCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
