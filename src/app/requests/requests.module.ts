import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import { ListRequestComponent } from '../list-request/list-request.component';
import { TravelsOfRequestComponent } from '../travels-of-request/travels-of-request.component';
import { AddRequestComponent } from '../add-request/add-request.component';
import { TravelsOfDriverComponent } from '../travels-of-driver/travels-of-driver.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsPageRoutingModule
  ],
  declarations: [RequestsPage,ListRequestComponent,TravelsOfRequestComponent,AddRequestComponent,TravelsOfDriverComponent]
})
export class RequestsPageModule {}
