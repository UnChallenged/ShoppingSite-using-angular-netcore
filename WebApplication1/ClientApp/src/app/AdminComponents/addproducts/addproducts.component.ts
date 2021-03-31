import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../../Services/MainService.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  title: string = "Create";
  public ProductId: number=0;
  public catlist = [];
  AddProductForm: FormGroup;

  constructor(private _avRoute: ActivatedRoute, private fb: FormBuilder, private myservice: MainService,
  private _router: Router) {
    this.getcategories();
    if (this._avRoute.snapshot.params["id"]) {
      this.ProductId = this._avRoute.snapshot.params["id"];
    }
    this.AddProductForm = this.fb.group({
      productId: this.ProductId,
      productName: [''],
      productPrice: [],
      productQuantity: [],
      productImage: [''],
      CatId: []
    });
  }
  

  ngOnInit(): void {
    if (this.ProductId > 0) {
      this.title = "Edit";
      this.myservice.getsingleproduct(this.ProductId)
        .subscribe(resp => this.AddProductForm.patchValue(resp))
    }  
    
  }

  getcategories() {
    return this.myservice.getcategories().subscribe(
      data => this.catlist = data);
  }

  onsubmit() {
    if (this.title == "Create") {
      this.myservice.addproducts(this.AddProductForm.value)
        .subscribe((data) => {
          this._router.navigate(['/admin/manageproducts']);
        });
    }
    else if (this.title == "Edit") {
      this.myservice.updateproduct(this.ProductId, this.AddProductForm.value)
        .subscribe((data) => {
          this._router.navigate(['/admin/manageproducts']);
        })
    }
  }

}
