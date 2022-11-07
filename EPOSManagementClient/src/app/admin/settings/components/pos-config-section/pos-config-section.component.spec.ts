import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosConfigSectionComponent } from './pos-config-section.component';

describe('PosConfigSectionComponent', () => {
  let component: PosConfigSectionComponent;
  let fixture: ComponentFixture<PosConfigSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosConfigSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosConfigSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
