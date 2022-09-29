import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManageViewComponent } from './item-manage-view.component';

describe('ItemManageViewComponent', () => {
  let component: ItemManageViewComponent;
  let fixture: ComponentFixture<ItemManageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemManageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
