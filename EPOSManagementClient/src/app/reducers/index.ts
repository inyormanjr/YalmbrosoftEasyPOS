import {
  ActionReducer,
  ActionReducerMap,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export const appstoreFeatureKey = 'appstore';

export interface AppState {
  isNavigating: boolean;
}

export const appInitialState: AppState = {
 isNavigating: false
}

const selectAppFeature = createFeatureSelector<AppState>(appstoreFeatureKey);

export const selectAppIsNavigating = createSelector(
  selectAppFeature,
  (x) => x.isNavigating
);

//actions

export const isNavigatingRoute = createAction('[App] App Routing Navigation');

export const isNavigatingRouteDone = createAction(
  '[App] App Routing Navigation Done'
);

export const appReducer = createReducer(
  appInitialState,
  on(isNavigatingRoute, (state, action) => {
    return {
      ...state,
      isNavigating: true,
    };
  }),
  on(isNavigatingRouteDone, (state, action) => {
    return {
      ...state,
      isNavigating: false,
    };
  })
);






