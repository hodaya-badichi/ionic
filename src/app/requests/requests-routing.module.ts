import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsPage } from './requests.page';
import { ListRequestComponent } from '../list-request/list-request.component';
import { TravelsOfRequestComponent } from '../travels-of-request/travels-of-request.component';
import { AddRequestComponent } from '../add-request/add-request.component';
import { ListTravelsComponent } from '../list-travels/list-travels.component';
import { TravelComponent } from '../travel/travel.component';
import { ChatComponent } from '../chat/chat.component';
import { MapOfTravelComponent } from '../map-of-travel/map-of-travel.component';
import { ListDriverComponent } from '../list-driver/list-driver.component';
import { CommentsOfDriverComponent } from '../comments-of-driver/comments-of-driver.component';
import { GroupsComponent } from '../groups/groups.component';
import { MessegeComponent } from '../messege/messege.component';
import { AboutComponent } from '../about/about.component';


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
   path:"groups/chat/:TravelCode",
   component:ChatComponent
 },

 {
  path:"groups",
  component:GroupsComponent
},
 {
    path:'list-travels',
    component:ListTravelsComponent
 },
 {
   path:'list-travels/request',
   component:RequestsPage
 },
 {
  path:"list-travels/chat/:TravelCode",
  component:ChatComponent
},
{
  path:'map',
  component:MapOfTravelComponent
},
{
  path:'list-travels/list-drivers/:TravelCode',
  component:ListDriverComponent
},
{
  path:'list-requests/map/:TravelCode',
  component:MapOfTravelComponent
},
{
  path:'list-travels/map/:TravelCode',
  component:MapOfTravelComponent
},
{
  path:"list-drivers",
  component:ListDriverComponent
},
{
  path:"messege",
  component:MessegeComponent
},
{
  path:"messege/commentsOfDriver/:DriverId",
  component:CommentsOfDriverComponent
},
{
  path:"about",
  component:AboutComponent
},
{
  path:"list-drivers/commentsOfDriver/:DriverId",
  component:CommentsOfDriverComponent
},

{
  path:"commentsOfDriver/:DriverId",
  component:CommentsOfDriverComponent
},
{
  path:"list-travels/commentsOfDriver/:DriverId",
  component:CommentsOfDriverComponent
},
{
  path:"list-requests/commentsOfDriver/:DriverId",
  component:CommentsOfDriverComponent
},
 {
  path:'list-travels/Travel/:travelCode',
  component:TravelComponent

 },
//  {
//   path:"list-requests/add-request",
//   component:AddRequestComponent
// },
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
