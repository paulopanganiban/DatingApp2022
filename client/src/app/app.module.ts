// _app.tsx in NextJS

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // we declare here the components available to use
    AppComponent
  ],
  // import angular modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    // make HTTP requests
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
