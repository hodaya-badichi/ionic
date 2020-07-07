import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxiPage } from './taxi.page';
import { Tab3Page } from '../tab3/tab3.page';
import { FormComponent } from '../form/form.component';
import { TravelsComponent } from '../travels/travels.component';
import { ExistComponent } from '../exist/exist.component';
import { LoginComponent } from '../login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'taxi',
    component: TaxiPage,
 
  }, 
  {
    path: 'form',
    component: FormComponent
  },
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
  {
    path: 'exist',
    component: ExistComponent,
    children:[
      {
        path: 'travels',
        component: TravelsComponent,
      }
    ]
  },
  {
    path: 'travels',
    component: TravelsComponent,
  }  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class TaxiPageRoutingModule { }
