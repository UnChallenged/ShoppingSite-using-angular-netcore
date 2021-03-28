export class Orderitems implements IorderItem {

  constructor(public itemId?: number,
  public productId?: number,
  public productName?: string,
  public productPrice?: number,
  public quantityValue?: number,
  ) { }
  }


export interface IorderItem {
  itemId?: number;
  productId?: number;
  productName?: string;
  productPrice?: number;
  quantityValue?: number;
}
