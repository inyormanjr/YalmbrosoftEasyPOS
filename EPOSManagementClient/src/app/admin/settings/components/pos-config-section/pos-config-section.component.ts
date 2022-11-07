import { ToastrService } from 'ngx-toastr';
import { PosService } from './../../../../pos/services/pos.service';
import { PosConfig } from 'src/app/models/pos.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-config-section',
  templateUrl: './pos-config-section.component.html',
  styleUrls: ['./pos-config-section.component.css']
})
export class PosConfigSectionComponent implements OnInit {
  currentPOSConfig: PosConfig | undefined;
  constructor(private posConfigService: PosService, private toastR: ToastrService) {

  }

  ngOnInit(): void {
     this.posConfigService
       .getPosConfig()
       .subscribe((x) => (this.currentPOSConfig = x));
  }

  update() {
    this.posConfigService.updatePosConfig(this.currentPOSConfig?._id, this.currentPOSConfig).subscribe(x => {
      this.toastR.success('POS Config Updated');
     },
      er => {
        this.toastR.error('Something went wrong. Please check your connection.');
     });
  }

}
