import { IorderItem } from "./orderItems";
export class Orderdata implements Order {
  orderId: number;
  uid: number;
  orderdate: string;
  orderstatus: string;
  orderprice: number;
  orderitems: Array<IorderItem>=[];
}
export interface Order{
  orderId: number;
  uid: number;
  orderdate: string;
  orderstatus: string;
  orderprice: number;
  orderitems: Array<IorderItem>;
}
