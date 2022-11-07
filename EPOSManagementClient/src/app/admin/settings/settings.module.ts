import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsViewComponent } from './settings-view/settings-view.component';
import { GeneralViewComponent } from './views/general-view/general-view.component';
import { PosConfigSectionComponent } from './components/pos-config-section/pos-config-section.component';
import { PosTransactionSectionComponent } from './components/pos-transaction-section/pos-transaction-section.component';
import { NgxModule } from 'src/app/shared/ngx-bootstrap/ngx/ngx.module';
import { ManagePhotoModalComponent } from './components/manage-photo-modal/manage-photo-modal.component';
import { ManageNameModalComponent } from './components/manage-name-modal/manage-name-modal.component';
import { ManageAddressModalComponent } from './components/manage-address-modal/manage-address-modal.component';
import { ManageGenderModalComponent } from './components/manage-gender-modal/manage-gender-modal.component';
import { ManageEmailModalComponent } from './components/manage-email-modal/manage-email-modal.component';
import { ManagePhoneModalComponent } from './components/manage-phone-modal/manage-phone-modal.component';
import { ManageChangePasswordModalComponent } from './components/manage-change-password-modal/manage-change-password-modal.component';


const routes: Routes = [{
  path: '', component: SettingsViewComponent, children: [
    { path: 'general', component: GeneralViewComponent },
    { path: 'profile', component: ProfileComponent},
    {path: '', redirectTo: 'general', pathMatch: 'full'}
  ]
}];
@NgModule({
  declarations: [
    SettingsViewComponent,
    GeneralViewComponent,
    ProfileComponent,
    PosConfigSectionComponent,
    PosTransactionSectionComponent,
    ManagePhotoModalComponent,
    ManageNameModalComponent,
    ManageAddressModalComponent,
    ManageGenderModalComponent,
    ManageEmailModalComponent,
    ManagePhoneModalComponent,
    ManageChangePasswordModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxModule,
    RouterModule.forChild(routes),
  ],
})
export class SettingsModule {}
