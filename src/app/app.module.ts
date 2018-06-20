import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Http, Response, Request, Headers} from '@angular/http';
import { AppComponent } from './app.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AppService} from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [AppService, HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
