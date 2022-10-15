import { selectAppIsNavigating } from './../../../reducers/index';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardSelectorTypes } from '../../selectors/admin.selector.types';
import { AdminModel } from '../../stateModels/admin.model';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  companyName = 'Company Name';
  currentUser$: Observable<String>;
  company$: Observable<String>;
  isNavigating$: Observable<boolean>;
  constructor(private appStore: Store<AppState>, private adminStore: Store<AdminModel>) {
    this.isNavigating$ = appStore.select(selectAppIsNavigating);
    this.currentUser$ = adminStore.select(DashboardSelectorTypes.selectCurrentUser);
    this.company$ = adminStore.select(DashboardSelectorTypes.selectCompanyName);
  }

  ngOnInit(): void {}
}
