import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserManagementEffects } from './user-management.effects';

describe('UserManagementEffects', () => {
  let actions$: Observable<any>;
  let effects: UserManagementEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserManagementEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserManagementEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
