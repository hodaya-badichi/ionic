import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxiPage } from './taxi.page';
import { LoginComponent } from '../login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RequestsPage } from '../requests/requests.page';

const routes: Routes = [
  {
    path: 'taxi',
    component: TaxiPage,
 
  }, 
  // {
  //   path:'login/requests',
  //   component:RequestsPage,
  // },
  // {
  //   path:'registration/requests',
  //   component:RequestsPage,
  // },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'login/forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'registration',
    component:RegistrationComponent
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class TaxiPageRoutingModule { }
