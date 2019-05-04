import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { BusinessListingsComponent } from './components/business-listings/business-listings.component';
import { IsThisBlackOwnedComponent } from './components/is-this-black-owned/is-this-black-owned.component';
import {WebcamModule} from 'ngx-webcam';
import {FormsModule} from '@angular/forms';
import { BusinessListingItemComponent } from './components/business-listing-item/business-listing-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BusinessListingsComponent,
    HomeViewComponent,
    IsThisBlackOwnedComponent,
    BusinessListingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
