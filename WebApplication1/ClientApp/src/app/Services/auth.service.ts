import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model-ts/User';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject<User>(new User())
  constructor(private http: HttpClient, private router: Router) { }

  login(userDetails) {
    return this.http.post<any>('api/login', userDetails).pipe(map(response => {
      localStorage.setItem('authToken', response.token);
      this.setUserDetails();
      return response;
    }));
  }
  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));
      userDetails.UEmail = decodeUserDetails.sub;
      userDetails.UName = decodeUserDetails.UName;
      userDetails.Uid = decodeUserDetails.Uid;
      userDetails.isLoggedIn = true;
      userDetails.role = decodeUserDetails.role;
      this.userData.next(userDetails);
    }
  }
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}
