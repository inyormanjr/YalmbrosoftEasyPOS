import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotificationItemComponent } from './dashboard-notification-item.component';

describe('DashboardNotificationItemComponent', () => {
  let component: DashboardNotificationItemComponent;
  let fixture: ComponentFixture<DashboardNotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNotificationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
