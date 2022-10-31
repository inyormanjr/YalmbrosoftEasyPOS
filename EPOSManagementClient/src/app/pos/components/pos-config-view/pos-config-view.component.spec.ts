import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosConfigViewComponent } from './pos-config-view.component';

describe('PosConfigViewComponent', () => {
  let component: PosConfigViewComponent;
  let fixture: ComponentFixture<PosConfigViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosConfigViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosConfigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
