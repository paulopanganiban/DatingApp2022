import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormProps } from '../nav/nav.component'
// in React terms parang helper function na nasa useEffect,
// na susubscribe tayo once the component mounts
// then unsubscribe on dismount
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // slash last is impt
  baseUrl = "https://localhost:5001/api/"
  // inject our http client in our account service
  // services are singleton!
  constructor(private http: HttpClient) {
  }
  login(form: FormProps) {
    return this.http.post(this.baseUrl + "account/login", form)
  }
}
