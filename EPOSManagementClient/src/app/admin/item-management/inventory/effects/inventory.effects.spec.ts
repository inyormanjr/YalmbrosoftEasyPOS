import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InventoryEffects } from './inventory.effects';

describe('InventoryEffects', () => {
  let actions$: Observable<any>;
  let effects: InventoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InventoryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(InventoryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
