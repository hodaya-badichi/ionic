import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RequestsPageRoutingModule } from './requests-routing.module';
import { RequestsPage } from './requests.page';
import { ListRequestComponent } from '../list-request/list-request.component';
import { TravelsOfRequestComponent } from '../travels-of-request/travels-of-request.component';
import { AddRequestComponent } from '../add-request/add-request.component';
import { ListTravelsComponent } from '../list-travels/list-travels.component';
import { TravelComponent } from '../travel/travel.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { ChatComponent } from '../chat/chat.component';
import { MapOfTravelComponent } from '../map-of-travel/map-of-travel.component';
import { ListDriverComponent } from '../list-driver/list-driver.component';
import { CommentsOfDriverComponent } from '../comments-of-driver/comments-of-driver.component';
import { GroupsComponent } from '../groups/groups.component';
import { MessegeComponent } from '../messege/messege.component';
import { AboutComponent } from '../about/about.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7FXQhE0DhQRyTX6wDCM3Ix3ASCPF6LFI', 
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
  ],
  declarations: [RequestsPage,ListRequestComponent,TravelsOfRequestComponent,AddRequestComponent,ListTravelsComponent,
  TravelComponent,ChatComponent,MapOfTravelComponent,ListDriverComponent,CommentsOfDriverComponent,GroupsComponent
  ,MessegeComponent,AboutComponent]
})
export class RequestsPageModule {}
