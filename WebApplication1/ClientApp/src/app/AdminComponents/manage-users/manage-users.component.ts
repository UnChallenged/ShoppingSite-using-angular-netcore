import { Component, OnInit } from '@angular/core';
import { SignupUsers } from '../../model-ts/SignupUsers';
import { MainService } from '../../Services/MainService.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  public userlist: SignupUsers[] = []
  constructor(private mainservice: MainService) {
    this.getusers();
  }

  ngOnInit(): void {
  }

  getusers() {
    this.mainservice.getusers().subscribe(u => this.userlist = u);
  }
}
