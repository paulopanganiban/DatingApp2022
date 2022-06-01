import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormProps } from '../nav/nav.component'
import { map } from 'rxjs/operators';
import { User } from '../types/user';
import { ReplaySubject } from 'rxjs';
// in React terms parang helper function na nasa useEffect,
// na susubscribe tayo once the component mounts
// then unsubscribe on dismount
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // create an observable for the user
  private currentUserSource = new ReplaySubject<User>(1);
  // dollar sign at the end means its an observable
  currentUser$ = this.currentUserSource.asObservable();
  // slash last is impt
  baseUrl = "https://localhost:5001/api/"
  // inject our http client in our account service
  // services are singleton!
  constructor(private http: HttpClient) {
  }
  login(form: FormProps) {
    return this.http.post<User>(this.baseUrl + "account/login", form).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }
  register(model: any) {
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
} 
