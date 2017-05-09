import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { 
  SumService,
  ArithmeticModule,
  MaterialUserInterfaceModule } from 'ng-material-components/modules/ng-material-components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ArithmeticModule.forRoot(),
    MaterialUserInterfaceModule.forRoot(),
  ],
  providers: [ SumService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
