import { Router } from '@angular/router';
import { selectAppIsNavigating } from './../../../reducers/index';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { adminSelectorTypes } from '../../selectors/admin.selector.types';
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
  constructor(private appStore: Store<AppState>, private adminStore: Store<AdminModel>, private router: Router) {
    this.isNavigating$ = appStore.select(selectAppIsNavigating);
    this.currentUser$ = adminStore.select(adminSelectorTypes.selectCurrentUser);
    this.company$ = adminStore.select(adminSelectorTypes.selectCompanyName);
  }

  ngOnInit(): void { }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('login');

  }
}
