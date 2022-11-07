import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFeatureKey } from '../reducers';
import { AdminModel } from '../stateModels/admin.model';

 const selectDashboardFeature =
  createFeatureSelector<AdminModel>(adminFeatureKey);

export const selectCurrentUser = createSelector(
  selectDashboardFeature,
  (x) => x.currentUser
);
export const selectIsCurrentLoading = createSelector(
  selectDashboardFeature,
  (x) => x.isLoading
);

export const selectCompanyName = createSelector(
  selectDashboardFeature,
  (x) => x.companyName
);

export const selectCurrentUserProfile = createSelector(selectDashboardFeature, (x) => x.userProfile);
