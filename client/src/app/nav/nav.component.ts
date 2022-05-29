import { Component, OnInit } from '@angular/core';
interface Form {
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
  form: Form = {} as Form;
  constructor() { }

  ngOnInit(): void {
  }
  // create func
  login() {
    console.log(this.form)
  }
}
