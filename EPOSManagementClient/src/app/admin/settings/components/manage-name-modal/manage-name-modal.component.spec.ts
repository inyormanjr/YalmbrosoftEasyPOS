import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNameModalComponent } from './manage-name-modal.component';

describe('ManageNameModalComponent', () => {
  let component: ManageNameModalComponent;
  let fixture: ComponentFixture<ManageNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
