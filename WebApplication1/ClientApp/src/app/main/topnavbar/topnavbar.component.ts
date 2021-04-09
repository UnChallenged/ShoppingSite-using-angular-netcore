import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserRole } from '../../model-ts/roles';
import { User } from '../../model-ts/User';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  userDataSubscription: any;
  userData = new User();
  userRole = UserRole;


  constructor(private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }


  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout();
  }
}
