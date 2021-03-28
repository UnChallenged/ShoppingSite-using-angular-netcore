import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignupUsers, UserInfo } from '../../model-ts/SignupUsers';

@Component({
  selector: 'app-dialog-overview-userinfo',
  templateUrl: './dialog-overview-userinfo.component.html',
  styleUrls: ['./dialog-overview-userinfo.component.css']
})
export class DialogOverviewUserinfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewUserinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
