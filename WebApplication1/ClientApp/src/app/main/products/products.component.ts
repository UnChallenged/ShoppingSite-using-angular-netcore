import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/MainService.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../Services/cartservice.service';
import { Cartproduct } from '../../model-ts/cartproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
  breakpoint: number
  Searchvalue = '';

  constructor(public http: HttpClient, private productservice: MainService, private cart:CartService) {
    this.getproducts();
  }
  public prodlist = [];

  getproducts() {
    this.productservice.getproducts().subscribe(
      data => this.prodlist = data);
   
  }
  ngOnInit(): void {
    if (window.innerWidth <= 700) {
      this.breakpoint = 1
    }
    else if (window.innerWidth <= 1100) {
      this.breakpoint = 2
    }
    else {
      this.breakpoint = 3
    }
/*this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;*/
  }

  Addcart(product: Cartproduct) {
    this.cart.addProduct(product);
  }
  onResize(event) {
    if (event.target.innerWidth <= 700) {
      this.breakpoint = 1
    }
    else if (event.target.innerWidth <= 1100) {
      this.breakpoint = 2
    }
    else {
      this.breakpoint = 3
    }
    //this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }
}
