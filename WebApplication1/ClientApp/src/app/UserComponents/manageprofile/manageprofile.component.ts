import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../Services/MainService.service';
import { ConfirmPasswordValidator } from '../../../assets/confirm-password.validator';
import { AuthService } from '../../Services/auth.service';
import { UserRole } from '../../model-ts/roles';
import { User } from '../../model-ts/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manageprofile',
  templateUrl: './manageprofile.component.html',
  styleUrls: ['./manageprofile.component.css']
})
export class ManageprofileComponent implements OnInit {
  UserprofileForm: FormGroup;
  uid: number;
  userDataSubscription: any;
  userData = new User();
  userRole = UserRole;

  constructor(private _snackBar: MatSnackBar,private authService: AuthService, private mainservice: MainService, private fb: FormBuilder) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });

    this.UserprofileForm = this.fb.group({
      Uid: this.userData.Uid,
      uName: ['', Validators.required],
      uAddress: ['', Validators.required],
      uContact: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      uEmail: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      uPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassFormControl: ['', Validators.required]
    }
      , { validator: ConfirmPasswordValidator.MatchPassword });

    this.getuserdetails();
  }

  ngOnInit(): void {
  }

  getuserdetails() {
    this.uid = this.userData.Uid;
    this.mainservice.getcurrentuserprofile(this.uid)
      .subscribe(resp => this.UserprofileForm.patchValue(resp))
  }

  onsubmit() {
    if (this.UserprofileForm.valid) {
      delete this.UserprofileForm.value.confirmpassFormControl;
      this.mainservice.updateuser(this.uid, this.UserprofileForm.value).subscribe(
        resp => this._snackBar.open("Updated", '', {
          duration: 2000,
        }));
    }

  }

  get name() {
    return this.UserprofileForm.get('uName')
  }
  get address() {
    return this.UserprofileForm.get('uAddress')
  }
  get number() {
    return this.UserprofileForm.get('uContact')
  }
  get email() {
    return this.UserprofileForm.get('uEmail')
  }
  get password() {
    return this.UserprofileForm.get('uPassword')
  }
  get confirmpassword() {
    return this.UserprofileForm.get('confirmpassFormControl')
  }
}
