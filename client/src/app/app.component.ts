import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  users: any;
  constructor(private accountService: AccountService) {
  }
  ngOnInit() {
    this.seCurrentUser()
  }
  seCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    if (!user) return;
    this.accountService.setCurrentUser(user);
  }
}
