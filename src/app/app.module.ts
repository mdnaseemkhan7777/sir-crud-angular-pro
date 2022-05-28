import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from'@angular/forms';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemsComponent } from './items/items.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomeComponent } from './home/home.component';
import {OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TemplateDrivenComponent,
    ReactiveFormComponent,
    UserComponent,
    CustomerComponent,
    ItemsComponent,
    SignupPageComponent,
    HomeComponent,
    OrderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
