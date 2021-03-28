import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategories } from '../model-ts/categories';
import { Iproducts } from '../model-ts/products';
import { Order, Orderdata } from '../model-ts/order';
import { SignupUsers } from '../model-ts/SignupUsers';



const sessionUrl = "/api/session";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  myAppUrl: string = "";  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  //product orders

  getcategories(): Observable<Icategories[]> {
    return this.http.get<Icategories[]>(this.myAppUrl + 'api/Products/api/admin/addproducts/getcatlist');
  }
  addproducts(product: Iproducts): Observable<Iproducts[]> {
    return this.http.post<Iproducts[]>(this.myAppUrl + 'api/Products/api/admin/addproducts/add', product);
  }
  getproducts(): Observable<Iproducts[]> {
    return this.http.get<Iproducts[]>(this.myAppUrl + 'api/Products/api/admin/manageproducts/getproducts');

  }
  deleteproduct(id): Observable<any> {
    return this.http.delete(this.myAppUrl + 'api/Products/api/admin/manageproducts/delete/' + id);
  }
  getsingleproduct(id: number): Observable<Iproducts> {
    return this.http.get<Iproducts>(this.myAppUrl + 'api/Products/' + id);
  }
  updateproduct(id:number,product: Iproducts): Observable<Iproducts> {
    return this.http.put<Iproducts>(this.myAppUrl + `api/Products/${id}`, product);
  }

  //order services

  placeorder(orderdata: Order): Observable<any> {
    return this.http.post<any>(this.myAppUrl + 'api/Orders',orderdata);
  }
  getorder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.myAppUrl + 'api/Orders');
  }
  updateorder(id: number, status: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('responseType', 'json');
    return this.http.put<any>(this.myAppUrl + `api/Orders/api/updateorder/${id}/${status}`, { headers: headers });
  }
  getuserinfo(id: number): Observable<SignupUsers> {
    return this.http.get<SignupUsers>(this.myAppUrl + 'api/Signup/api/getuserbyid/' + id);
  }

  //user services
  signup(user: SignupUsers): Observable<Response> {
    return this.http.post<Response>(this.myAppUrl + 'api/Signup', user);
  }
  getcurrentuserprofile(id: number): Observable<SignupUsers> {
    return this.http.get <SignupUsers>(this.myAppUrl + 'api/Signup/' + id);
  }
  updateuser(id: number,user: SignupUsers): Observable<SignupUsers> {
    return this.http.put<SignupUsers>(this.myAppUrl + `api/Signup/${id}` ,user);
  }
  getuserorders(id: number): Observable<Order[]> {
    return this.http.get < Order[]>(this.myAppUrl +`api/Orders/api/getorderbyid/${id}`);
  }
  getusers(): Observable<SignupUsers[]> {
    return this.http.get<SignupUsers[]>(this.myAppUrl + 'api/Signup');
  }

  storeSessionData<T>(dataType: string, data: T) {
    return this.http.post(`${sessionUrl}/${dataType}`, data)
      .subscribe(response => { });
  }
  getSessionData<T>(dataType: string): Observable<T> {
    return this.http.get<T>(`${sessionUrl}/${dataType}`);
  }
}
