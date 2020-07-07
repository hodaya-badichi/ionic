import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaxiPageRoutingModule } from './taxi-routing.module';

import { TaxiPage } from './taxi.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component.module';
import { FormComponent } from '../form/form.component';
import { TravelsComponent } from '../travels/travels.component';
import { LoginComponent } from '../login/login.component';
import { ExistComponent } from '../exist/exist.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@NgModule({
  imports: [
    RouterModule,
  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    //ComponentModule,
    TaxiPageRoutingModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TaxiPage }]),
  ],
  declarations: [TaxiPage,FormComponent,ExistComponent,LoginComponent,TravelsComponent,RegistrationComponent,ForgotPasswordComponent],
  
})
export class TaxiPageModule {}
