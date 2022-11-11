import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RegistrationCompleteComponent } from './confirmation/registration-complete/registration-complete.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/login.module').then((x) => x.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../app/registration/registration.module').then(
        (x) => x.RegistrationModule
      ),
  },
  { path: 'registration-complete', component: RegistrationCompleteComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/admin/admin.module').then((x) => x.AdminModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['Owner', 'Admin'],
    },
  },

  {
    path: 'pos',
    loadChildren: () =>
      import('../app/pos/pos.module').then((x) => x.PosModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['Owner', 'Admin', 'Cashier'],
    },
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
