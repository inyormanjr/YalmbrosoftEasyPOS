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
      import('../app/registration/registration.module').then((x) => x.RegistrationModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/admin/admin.module').then((x) => x.AdminModule),
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
