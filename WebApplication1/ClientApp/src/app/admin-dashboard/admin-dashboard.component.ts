import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  manageorders() {
    this.router.navigate(['manageorders'], { relativeTo: this.route });
  }
  addproduct() {
    this.router.navigate(['addproducts'], { relativeTo: this.route });
  }
  manageproduct() {
    this.router.navigate(['manageproducts'], { relativeTo: this.route });
  }
  manageusers() {
    this.router.navigate(['manageusers'], { relativeTo: this.route });
  }
}
