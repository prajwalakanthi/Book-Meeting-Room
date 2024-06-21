import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatTableModule} from '@angular/material/table';
import { MeetingDetailsTableComponent } from './landing-page/meeting-details-table/meeting-details-table.component';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogTitle, MatDialogContent, MatDialogActions,MatDialogClose} from '@angular/material/dialog';
import { BookMeetingPopupComponent } from './landing-page/book-meeting-popup/book-meeting-popup.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonServiceService } from './common-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    MeetingDetailsTableComponent,
    BookMeetingPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [
   {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
   provideNativeDateAdapter(),
   CommonServiceService,
   HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
