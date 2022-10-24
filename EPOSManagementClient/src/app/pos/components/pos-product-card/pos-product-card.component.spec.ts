import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosProductCardComponent } from './pos-product-card.component';

describe('PosProductCardComponent', () => {
  let component: PosProductCardComponent;
  let fixture: ComponentFixture<PosProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
