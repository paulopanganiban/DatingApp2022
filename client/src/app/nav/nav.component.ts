import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
  // create func
  login() {
    this.accountService.login(this.form).subscribe({
      // this.loggedIn = true is setLoggedIn(true) in React
      // kinda like router.push('/members')
      next: response => { this.router.navigateByUrl('/members') },
      error: error => console.log(error)
    })
  }
  logout() {
    this.router.navigateByUrl('/')
    this.accountService.logout()
  }
}
