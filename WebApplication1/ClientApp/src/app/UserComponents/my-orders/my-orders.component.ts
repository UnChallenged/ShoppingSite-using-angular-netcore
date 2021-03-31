import { Component, OnInit } from '@angular/core';
import { Order } from '../../model-ts/order';
import { MainService } from '../../Services/MainService.service';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../model-ts/User';
import { UserRole } from '../../model-ts/roles';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public userorderlist: Order[] = [];
  uid: number;
  userDataSubscription: any;
  userData = new User();
  userRole = UserRole;
  constructor(private authService: AuthService,public orderservice: MainService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
    this.uid = this.userData.Uid;
    this.getorders(this.uid);
  }

  ngOnInit(): void {
  }
  getorders(id: number) {
    this.orderservice.getuserorders(id).subscribe(data => this.userorderlist = data);
  }
}
