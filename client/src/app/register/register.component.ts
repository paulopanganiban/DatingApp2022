import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';
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
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  register() {
    this.accountService.register(this.model).subscribe(
      (response) => { this.cancel() },
      (error) => { console.log(error); this.toastr.error(error.error) }
    )
  }
  cancel() {
    this.cancelRegisterFromRegisterComponent.emit(false);
  }
}
