import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

/**
 * Firebase Setup
 */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { BusinessListingsComponent } from './components/business-listings/business-listings.component';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
=======
import { IsThisBlackOwnedComponent } from './components/is-this-black-owned/is-this-black-owned.component';
import {WebcamModule} from 'ngx-webcam';
import {FormsModule} from '@angular/forms';
>>>>>>> db3b343944961982af302b4780d8bb24b2a1750b
import { BusinessListingItemComponent } from './components/business-listing-item/business-listing-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BusinessListingsComponent,
    HomeViewComponent,
<<<<<<< HEAD
    LoginComponent,
=======
    IsThisBlackOwnedComponent,
>>>>>>> db3b343944961982af302b4780d8bb24b2a1750b
    BusinessListingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
=======
    WebcamModule,
    FormsModule,
>>>>>>> db3b343944961982af302b4780d8bb24b2a1750b
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

