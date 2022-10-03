import { AuthService } from './../../login/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css'],
})
export class RegisterViewComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService, private fB: FormBuilder) {
    this.registerForm = fB.group({
      companyName: [''],
      companyId: [''],
      firstName: [''],
      middleName: ['test'],
      lastName: [''],
      gender: ['Male'],
      username: [''],
      password: [''],
      userType: [['Owner']],
    });
  }

  ngOnInit(): void {}

  register() {
    const user = Object.assign({}, this.registerForm.value);
    console.log(user);
    this.authService.register(user).subscribe(x => console.log(x), error => console.log(error.error.error));
  }
}
