import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmPasswordValidator } from '../../assets/confirm-password.validator';
import { MainService } from '../Services/mytestservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmPasswordValidatorSignup } from '../../assets/confirm-password-signup.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupForm: FormGroup;

  constructor(private _router: Router,private _snackBar: MatSnackBar,private mainservice: MainService, private fb: FormBuilder) {
    this.SignupForm = this.fb.group({
      UName: ['', Validators.required],
      UAddress: ['', Validators.required],
      UContact: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      UEmail: ['', [Validators.required, Validators.email]],
      UPassword: ['', [Validators.required, Validators.minLength(5)]],
      UType:['customer'],
      confirmpassFormControl: ['', Validators.required]
    }
      , { validator: ConfirmPasswordValidatorSignup.MatchPassword });
  }

  ngOnInit(): void {
  }
  onsubmit() {
    if (this.SignupForm.valid) {
      delete this.SignupForm.value.confirmpassFormControl;
      this.mainservice.signup(this.SignupForm.value).subscribe(
        res => {
          if (res) {
            this._snackBar.open("Registerd", '', {
              duration: 2000,
            });
            this._router.navigateByUrl('/login');
          }
        },
        (error: HttpErrorResponse) => {
          if (error) {
            this._snackBar.open("User is Already Registerd", '', {
              duration: 5000,
            });
          }
        
        })
    }
  }

  
  get name() {
    return this.SignupForm.get('UName')
  }
  get address() {
    return this.SignupForm.get('UAddress')
  }
  get number() {
    return this.SignupForm.get('UContact')
  }
  get email() {
    return this.SignupForm.get('UEmail')
  }
  get password() {
    return this.SignupForm.get('UPassword')
  }
  get confirmpassword() {
    return this.SignupForm.get('confirmpassFormControl')
  }
}
