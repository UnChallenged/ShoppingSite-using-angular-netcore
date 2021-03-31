import { Injectable } from '@angular/core';
import { MainService } from './MainService.service';

import { Cartproduct } from '../model-ts/cartproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  selections: ProductSelection[] = [];
  itemCount: number = 0;
  totalPrice: number = 0;

  constructor(private myservice: MainService) {
    myservice.getSessionData<ProductSelection[]>("cart").subscribe(cartData => {
      if (cartData != null) {

        cartData.forEach(item => this.selections.push(new ProductSelection(this, item.itemId, item.productId, item.productName, item.productPrice, item.productQuantity)));
        this.update(false);
      }
    });
  }

  addProduct(product: Cartproduct) {
  let selection = this.selections
    .find(ps => ps.productId == product.productId);
  if (selection) {
    selection.productQuantity++;
  } else {
    this.selections.push(new ProductSelection(this, product.itemId, product.productId, product.productName, product.productPrice, 1));
  }
  this.update();
  }
  addProductfromsinglepage(product: Cartproduct) {
    let selection = this.selections
      .find(ps => ps.productId == product.productId);
    if (selection) {
      selection.productQuantity = selection.productQuantity + product.productQuantity;
    } else {
      this.selections.push(new ProductSelection(this, product.itemId, product.productId, product.productName, product.productPrice, product.productQuantity));
    }
    this.update();
  }
updateQuantity(productId: number, productQuantity: number) {
  if (productQuantity > 0) {
    let selection = this.selections.find(ps => ps.productId == productId);
    if (selection) {
      selection.productQuantity = productQuantity;
    }
  } else {
    let index = this.selections.findIndex(ps => ps.productId == productId);
    if (index != -1) {
      this.selections.splice(index, 1);
    }
    this.update();
  }
}
clear() {
  this.selections = [];
  this.update();
}
  update(storeData: boolean = true) {
    this.itemCount = this.selections.map(ps => ps.productQuantity)
    .reduce((prev, curr) => prev + curr, 0);
    this.totalPrice = this.selections.map(ps => ps.productPrice * ps.productQuantity)
    .reduce((prev, curr) => prev + curr, 0);

  if (storeData) {
    this.myservice.storeSessionData("cart", this.selections.map(s => {
      return {
        itemId: s.itemId,productId: s.productId, productName: s.productName,
        productPrice: s.productPrice, productQuantity: s.productQuantity
        
      }
      
    }));
  }
}
}

export class ProductSelection {
  constructor(public cart: CartService,
    public itemId: number = 0,
    public productId?: number,
    public productName?: string,
    public productPrice?: number,
    private quantityValue?: number) { }


  get productQuantity() {
    return this.quantityValue;
  }
  set productQuantity(newQuantity: number) {
    this.quantityValue = newQuantity;
    this.cart.update();
  }
}
