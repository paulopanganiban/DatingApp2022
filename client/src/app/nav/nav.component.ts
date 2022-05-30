import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { User } from '../types/user';
export interface FormProps {
  username: string;
  password: string;
}
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
// in React terms = useState
export class NavComponent implements OnInit {
  // [form, setForm] = useState<Form>({} as Form
  form: FormProps = {} as FormProps;
  loggedIn: boolean = false;
  currentUser$: Observable<User> = {} as Observable<User>;
  // inject the account service we made
  // useHook to madalas! HOLY SHENNANIGANS!
  // https://blog.logrocket.com/dependency-injection-react/ react terms
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
  // create func
  login() {
    this.accountService.login(this.form).subscribe({
      // this.loggedIn = true is setLoggedIn(true) in React
      next: response => { console.log(response) },
      error: error => console.log(error)
    })
  }
  logout() {
    this.accountService.logout()
  }
}
