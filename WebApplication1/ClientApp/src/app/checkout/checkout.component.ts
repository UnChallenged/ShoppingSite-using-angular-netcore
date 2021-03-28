import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cartservice.service';
import { MainService } from '../Services/mytestservice.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { User } from '../model-ts/User';
import { Orderdata } from '../model-ts/order';
import { Orderitems } from '../model-ts/orderItems';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  confirmedOrderid: any;

  checkoutpage = true;
  confirmedpage = false;


  orderdata: FormGroup;
  userData = new User();
  date = new Date();
  userDataSubscription: any;
  orderitem: Orderitems[] = [];
  //table variables
  displayedColumns: string[] = ['productName', 'productQuantity', 'cost'];


  constructor(public router: Router, public activeRoutedService: ActivatedRoute, public datepipe: DatePipe, public cart: CartService, public postservice: MainService, private fb: FormBuilder, private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;


    });

  }

  ngOnInit(): void {

    this.orderdata = this.fb.group({
      orderid: 0,
      uid: this.userData.Uid,
      orderdate: this.date.getDate(),
      orderstatus: ['pending']


    });

    this.activeRoutedService.data.subscribe(data => {
      switch (data.kind) {
        case "confirmed":
          this.placeorder();
   }
})

  }

  placeorder() {
    this.orderdata.addControl('orderprice', new FormControl(this.cart.totalPrice))

    this.confirmedpage = true;
    this.checkoutpage = false;

    let now = new Date();

    const order = new Orderdata();

    order.uid = this.userData.Uid;
    order.orderdate = this.datepipe.transform(now, "MM/d/yy HH:MM:ss") + ""; //"01/01/98 23:59:59.999"//this.date.getDate();
    order.orderstatus = "Pending"
    order.orderprice = this.cart.totalPrice;

    for (var item of this.getproduct())
      order.orderitems.push(item)

    this.postservice.placeorder(order).subscribe(data =>
      this.confirmed(data.orderId)
    );
  }
  confirmed(id: any): void {

    this.confirmedOrderid = id;
    
    this.cart.clear();
   
  }

  getproduct(): Orderitems[] {
    return this.cart.selections.map(a => new Orderitems(
      a.itemId, a.productId, a.productName, a.productPrice, a.productQuantity
    ))
  }
}
