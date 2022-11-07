import { UsersService } from './../../../services/user/users.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-photo-modal',
  templateUrl: './manage-photo-modal.component.html',
  styleUrls: ['./manage-photo-modal.component.css']
})
export class ManagePhotoModalComponent implements OnInit {
  imageSelectionMode = false;
  currentSelectedPhoto: any;
  currentSelectedFilePhoto: any;
  constructor(public bsModalRef: BsModalRef, private userService: UsersService) { }

  ngOnInit(): void {
  }

  goToImageSelectionImage() {
    this.imageSelectionMode = !this.imageSelectionMode;
  }

  uploadPhoto() {
    console.log(this.currentSelectedPhoto);
    this.userService.uploadPhoto(this.currentSelectedFilePhoto).subscribe(
      (x) => console.log(x),
      (err) => console.log(err)
    );
  }

  onFileChanged(event: any) {
    this.currentSelectedFilePhoto = event.target.files[0];
    console.log(this.currentSelectedFilePhoto);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.currentSelectedPhoto = (<FileReader>event.target).result;
    }
  }

}
