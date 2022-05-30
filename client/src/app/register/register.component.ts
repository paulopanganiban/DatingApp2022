import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormProps } from '../types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // parang props in React
  // <Register usersFromHomeComponent={}/>
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegisterFromRegisterComponent = new EventEmitter<boolean>();
  model: FormProps = {} as FormProps;
  constructor() { }

  ngOnInit(): void {
  }
  register() {
    console.log(this.model);
  }
  cancel() {
    this.cancelRegisterFromRegisterComponent.emit(false);
  }
}
