import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
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
  // inject the account service we made
  // useHook to madalas! HOLY SHENNANIGANS!
  // https://blog.logrocket.com/dependency-injection-react/ react terms
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  // create func
  login() {
    this.accountService.login(this.form).subscribe({
      // this.loggedIn = true is setLoggedIn(true) in React
      next: response => { console.log(response); this.loggedIn = true},
      error: error => console.log(error)
    })
  }
  logout() {
    // setLoggedIn(false) in React
    this.loggedIn = false
  }
}
