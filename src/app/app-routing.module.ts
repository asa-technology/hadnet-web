import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { BusinessListingsComponent } from './components/business-listings/business-listings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IsThisBlackOwnedComponent } from './components/is-this-black-owned/is-this-black-owned.component';

const routes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'business-listings', component: BusinessListingsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'isThisBlackOwned', component: IsThisBlackOwnedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
