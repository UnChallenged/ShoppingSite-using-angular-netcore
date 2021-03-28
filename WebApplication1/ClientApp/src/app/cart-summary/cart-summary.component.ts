import { Component, OnInit } from '@angular/core';

import { CartService } from '../Services/cartservice.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(private cart: CartService) { }

  get itemCount(): number {
    return this.cart.itemCount;
  }
  get totalPrice(): number {
    return this.cart.totalPrice;
  }

  ngOnInit(): void {
  }

}
