import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsPage } from './requests.page';
import { ListRequestComponent } from '../list-request/list-request.component';
import { TravelsOfRequestComponent } from '../travels-of-request/travels-of-request.component';
import { AddRequestComponent } from '../add-request/add-request.component';
import { TravelsOfDriverComponent } from '../travels-of-driver/travels-of-driver.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsPage,
    // children:[
    //   {
    //     path:'list-requests',
    //     component:ListRequestComponent,
    //   },
      
    //]
    
  },
  {
    path:'list-requests',
    component:ListRequestComponent
  }
 ,
 {
   path:"list-requests/Travels/:RequestCode",
   component:TravelsOfRequestComponent
 },
 {
    path:'travelsOfDriver',
    component:TravelsOfDriverComponent
 },
 {
   path:"add-request",
   component:AddRequestComponent
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsPageRoutingModule {}
