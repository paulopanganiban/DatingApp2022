// _app.tsx in NextJS

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // we declare here the components available to use
    AppComponent,
    NavComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
