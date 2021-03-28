import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from '../../Services/mytestservice.service';
import { Order } from '../../model-ts/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupUsers } from '../../model-ts/SignupUsers';
import { User } from '../../model-ts/User';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewUserinfoComponent } from '../dialog-overview-userinfo/dialog-overview-userinfo.component';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  panelOpenState = false;
  public orderlist: Order[] = [];
  public userinfo: SignupUsers;
  selected = 'Pending';
  constructor(public dialog: MatDialog,public orderservice: MainService, private _snackBar: MatSnackBar) {
    this.getorders()
  }

  ngOnInit(): void {
  }
  getorders() {
    this.orderservice.getorder().subscribe(data=>this.orderlist = data);
  }
  updatestatus(id: number, status: string) {
    this.orderservice.updateorder(id, status).subscribe(data => {
      this.getorders();
      this.openSnackBar("Order is Update", 'dismiss')
    });
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  viewuser(id: number) {
    this.orderservice.getuserinfo(id).subscribe(res => {
      this.userinfo = res;
      this.openDialog(this.userinfo);
    });
  }

  openDialog(userdata: SignupUsers): void {
    const dialogRef = this.dialog.open(DialogOverviewUserinfoComponent, {
      width: '330px',
      data: userdata
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

