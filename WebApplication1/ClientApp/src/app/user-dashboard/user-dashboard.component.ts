import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  manageprofile() {
    this.router.navigate(['manageprofile'], { relativeTo: this.route });
  }
  myorders() {
    this.router.navigate(['myorders'], { relativeTo: this.route });
  }
}
