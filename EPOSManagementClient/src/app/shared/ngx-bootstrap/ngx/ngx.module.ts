import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxRippleModule } from 'ngx-ripple-effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxRippleModule,
  ],
  exports: [ModalModule, TabsModule, NgxRippleModule],
})
export class NgxModule {}
