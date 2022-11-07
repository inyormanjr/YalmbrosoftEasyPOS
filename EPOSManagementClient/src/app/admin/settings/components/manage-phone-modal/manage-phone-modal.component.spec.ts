import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhoneModalComponent } from './manage-phone-modal.component';

describe('ManagePhoneModalComponent', () => {
  let component: ManagePhoneModalComponent;
  let fixture: ComponentFixture<ManagePhoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePhoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
