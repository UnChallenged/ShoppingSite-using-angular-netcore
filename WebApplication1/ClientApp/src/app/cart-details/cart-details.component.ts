import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cartservice.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  constructor(public cart: CartService) { }

  ngOnInit(): void {
   
  }

  



}
