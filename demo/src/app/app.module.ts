import 'bootstrap-loader';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { 
  SumService,
  ArithmeticModule,
  MaterialUserInterfaceModule, MaterialFormsModule } from 'ng-material-components/modules/ng-material-components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    ArithmeticModule.forRoot(),
    // MaterialUserInterfaceModule.forRoot(),
    // MaterialFormsModule.forRoot(),
  ],
  providers: [ SumService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
