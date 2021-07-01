import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { first } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      UEmail: ['', Validators.required],
      UPassword: ['', Validators.required]
    }); 
  }
  get loginFormControl() { return this.LoginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.authService.login(this.LoginForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([returnUrl]);
        },
        () => {
          this._snackBar.open("Invalid login", '', {
            duration: 5000,
          });
        })
      
        }
      
  
  

  get email() {
    return this.LoginForm.get('UEmail')
  }
  get password() {
    return this.LoginForm.get('UPassword')
  }
}
