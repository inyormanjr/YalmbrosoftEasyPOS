import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhotoModalComponent } from './manage-photo-modal.component';

describe('ManagePhotoModalComponent', () => {
  let component: ManagePhotoModalComponent;
  let fixture: ComponentFixture<ManagePhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePhotoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
