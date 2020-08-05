import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaxiPageRoutingModule } from './taxi-routing.module';
import { TaxiPage } from './taxi.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { ExistComponent } from '../exist/exist.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RequestsPage } from '../requests/requests.page';


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
  declarations: [TaxiPage,ExistComponent,LoginComponent,RegistrationComponent,ForgotPasswordComponent],
  
})
export class TaxiPageModule {}
