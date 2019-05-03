import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { BusinessListingsComponent } from './components/business-listings/business-listings.component';

const routes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'business-listings', component: BusinessListingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
