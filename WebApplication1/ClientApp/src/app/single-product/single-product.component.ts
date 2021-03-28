import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../Services/mytestservice.service';
import { Iproducts } from '../model-ts/products';
import { CartService } from '../Services/cartservice.service';
import { Cartproduct } from '../model-ts/cartproduct';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  id: number;
  prodname: string;
  prodprice: number;
  quantity: number;
  public myproduct: Iproducts;

  constructor(private _avRoute: ActivatedRoute,
    private mainservice: MainService, private _router: Router, private cart: CartService) {
    if (this._avRoute.snapshot.params["id"]) {
      this.id = this._avRoute.snapshot.params["id"];
      this.getproduct();
    }
    this.quantity = 1;
  //  this.prodname = this.myproduct.productName;
  }

  ngOnInit(): void {
  }

  getproduct() {
    if (this.id > 0) {
      this.mainservice.getsingleproduct(this.id)
        .subscribe(data => this.myproduct=data);
    }
  }
  
  addtocart() {
    if (this.quantity < 1) { this.quantity = 1 }
   // console.log(this.myproduct);

    const product = new Cartproduct(0, this.id, this.myproduct.productName, this.myproduct.productPrice, this.quantity);
    this.cart.addProductfromsinglepage(product);
  }
  incrmntbtn() {
    this.quantity = this.quantity + 1;
  }
  decrmntbtn() {
    this.quantity = this.quantity - 1;
    if (this.quantity < 1) { this.quantity=1 }
  }
}
