import { Component, OnInit } from '@angular/core';
import { MainService } from '../Services/mytestservice.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../Services/cartservice.service';
import { Cartproduct } from '../model-ts/cartproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {



  constructor(public http: HttpClient, private productservice: MainService, private cart:CartService) {
    this.getproducts();
  }
  public prodlist = [];

  getproducts() {
    this.productservice.getproducts().subscribe(
      data => this.prodlist = data);
   
  }
  ngOnInit(): void {
  }

  Addcart(product: Cartproduct) {
    this.cart.addProduct(product);
  }

}
