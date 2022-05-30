// _app.tsx in NextJS

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [
    // we declare here the components available to use
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
  ],
  // import angular modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    // make HTTP requests
    HttpClientModule,
    BrowserAnimationsModule,
    // Angular package for handling forms
    FormsModule,
    // ngx bootstrap
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
