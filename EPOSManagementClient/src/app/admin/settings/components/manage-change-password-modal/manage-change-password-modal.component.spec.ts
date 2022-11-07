import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChangePasswordModalComponent } from './manage-change-password-modal.component';

describe('ManageChangePasswordModalComponent', () => {
  let component: ManageChangePasswordModalComponent;
  let fixture: ComponentFixture<ManageChangePasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageChangePasswordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChangePasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
