import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGenderModalComponent } from './manage-gender-modal.component';

describe('ManageGenderModalComponent', () => {
  let component: ManageGenderModalComponent;
  let fixture: ComponentFixture<ManageGenderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGenderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
