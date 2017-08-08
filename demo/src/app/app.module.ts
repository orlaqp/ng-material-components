import 'bootstrap-loader';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { 
  SumService,
  MaterialUserInterfaceModule, MaterialFormsModule,
  ArithmeticModule 
  } from 'ng-material-components/modules/ng-material-components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialUserInterfaceModule.forRoot(),
    MaterialFormsModule.forRoot(),
    ArithmeticModule.forRoot(),
  ],
  providers: [ SumService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
