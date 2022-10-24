import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PosEffectEffects } from './pos-effect.effects';

describe('PosEffectEffects', () => {
  let actions$: Observable<any>;
  let effects: PosEffectEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PosEffectEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PosEffectEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
