import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../../Services/mytestservice.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  

  constructor(public http: HttpClient, public productservice: MainService) {
    this.getproducts();
  }
  public prodlist = [];

  getproducts() {
    this.productservice.getproducts().subscribe(
      data => this.prodlist=data);
    console.log("product list: " + this.prodlist) //this line returns undefined
  }
    
  ngOnInit(): void {
    
  }
  delete(id) {
    var ans = confirm("do you want to delete id = " + id);
    if (ans) {
      this.productservice.deleteproduct(id).subscribe((data) => {
        this.getproducts();
      }, error => console.error(error))
    }
  }
}
