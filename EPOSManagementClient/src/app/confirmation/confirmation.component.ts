import { AuthService } from './../login/services/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private authService: AuthService, private router: Router) {
    activatedRouter.params.subscribe((x: any) => {

      authService.confirmation(x.id).subscribe(x => console.log(x),
        err => {
        console.log(err.error.error);
        this.router.navigateByUrl('../login');
      });
    });

   }

  ngOnInit(): void {
  }

}
