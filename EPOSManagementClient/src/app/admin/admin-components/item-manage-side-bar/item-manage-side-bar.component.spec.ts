import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManageSideBarComponent } from './item-manage-side-bar.component';

describe('ItemManageSideBarComponent', () => {
  let component: ItemManageSideBarComponent;
  let fixture: ComponentFixture<ItemManageSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemManageSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManageSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
