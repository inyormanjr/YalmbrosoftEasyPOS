import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardSelectorTypes } from '../../selectors/admin.selector.types';
import { AdminModel } from '../../stateModels/admin.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  companyName = 'Company Name';
  currentUser$: Observable<String>;
  company$: Observable<String>;
  constructor(private adminStore: Store<AdminModel>) {
    this.currentUser$ = adminStore.select(DashboardSelectorTypes.selectCurrentUser);
    this.company$ = adminStore.select(DashboardSelectorTypes.selectCompanyName);
  }

  ngOnInit(): void {}
}
