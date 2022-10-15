import { isNavigatingRoute, isNavigatingRouteDone } from './reducers/index';
import { slideInAnimation } from './animation';
import { Component } from '@angular/core';
import { NavigationCancel,Event, NavigationEnd, NavigationError, NavigationStart, Router,  } from '@angular/router';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'EPOSManagementClient';

  constructor(
    private _router: Router,
    private appStore: Store<AppState>
  ) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.appStore.dispatch(isNavigatingRoute());
    }
    if (event instanceof NavigationEnd) {
      this.appStore.dispatch(isNavigatingRouteDone());
    }
    if (event instanceof NavigationCancel) {
      this.appStore.dispatch(isNavigatingRouteDone());
    }
    if (event instanceof NavigationError) {
      this.appStore.dispatch(isNavigatingRouteDone());
    }
  }
}
