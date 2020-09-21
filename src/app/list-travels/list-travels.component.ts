import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { RequestService } from '../servises/request.service';
import {Request} from '../class/request';
import { ReturnStatement } from '@angular/compiler';
import { element } from 'protractor';
import { AgmDirection } from 'agm-direction';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController, Platform, AlertController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
import { CommentsService } from '../servises/comments.service';
import { Groups } from '../class/groups';
import { Messege } from '../class/messege';
import { MessegeService } from '../servises/messege.service';
@Component({
  selector: 'app-list-travels',
  templateUrl: './list-travels.component.html',
  styleUrls: ['../list-request/list-request.component.scss', '../app.component.scss', './list-travels.component.scss'],
})
export class ListTravelsComponent implements OnInit {
  private geoCoder;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  journeySearch: any;
  thisUser: User;
  thisTravel:Travels=null;
  AddRequest:boolean=false;
  travelsArr: Travels[] = [];
  requestsArr:Request[]=null;
  placesOfUser:number=0;
  maxPlacesOfTravel:number;
  hospitalLatLng: string;
  map: any;
  isProgress: boolean;
  appService: any;
  SourceAddress:string;
  DestinationAddress:string;
  isDriver:boolean;
  travelsAllArr:Travels[];
  constructor(public alertController: AlertController,public navCtrl: NavController, public platform: Platform,    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,public actionSheetController: ActionSheetController,private activatedRoute: ActivatedRoute,private travelService: TravelsService,
     private requestService: RequestService, private router: Router,private commentsSerice:CommentsService,
     private messegeService:MessegeService) {  }
     
    
     ngOnInit() {
      this.thisUser = JSON.parse(localStorage.getItem("user"));
      this.isDriver=JSON.parse(localStorage.getItem("isDriver"));
      this.travelService.getTravelsArr()
        .subscribe(
          (travels) => {
            this.travelsAllArr=this.travelsArr = travels;
            if(this.isDriver)
              this.travelsArr=this.travelsArr.filter(element=>element.UserId==this.thisUser.UserId);
            this.requestService.getRequests()
            .subscribe(
              (request)=>{this.requestsArr=request;  },
  
             (e) => {  console.log('No Request found!');}
   
            );
          },
          (e) => { console.log('No Travel found!'); }
        );
        this.activatedRoute.queryParams.subscribe(params => {
  
          this.hospitalLatLng = params.hospitalLatLng;
         
        });
      }
      
  

    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        });
      }
    }
  
  
    markerDragEnd($event: any) {
      console.log($event);
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
    }
  
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
  
      });
    }
  
   
  animtion(item:Travels){
    this.thisTravel=item;
    setTimeout(() => {
       let input_from:HTMLInputElement = (<HTMLInputElement>document.getElementById("SourceAddress"));
       let input_from2:HTMLInputElement = (<HTMLInputElement>document.getElementById("DestinationAddress"));
     
      let options = {
        types: [],
        componentRestrictions: { country: "IL" }
      };


      let autocomplete = new google.maps.places.Autocomplete(input_from, options);
      let autocomplete2 = new google.maps.places.Autocomplete(input_from2, options);
      let self = this;

      google.maps.event.addListener(autocomplete, 'place_changed', function () {

        let place = autocomplete.getPlace();
        let geometry = place.geometry;

        if ((geometry) !== undefined) {
          self.SourceAddress = place.name;
        } else {
          self.SourceAddress = item.SourceAddress;

        }

      });

      google.maps.event.addListener(autocomplete2, 'place_changed', function () {

        let place = autocomplete2.getPlace();
        let geometry = place.geometry;

        if ((geometry) !== undefined) {

          self.DestinationAddress = place.name;

        }
        else {
          self.DestinationAddress = item.DestinationAddress;

        }

      });





      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;

      
      });
      //     });
      (<HTMLInputElement>document.getElementById("SourceAddress")).value=item.SourceAddress;
     ( <HTMLInputElement>document.getElementById("DestinationAddress")).value=item.DestinationAddress;
    }, 1000);
    ///Auto
  }
  CheckedOfPlace(item: Travels): boolean {
    let sum:number=this.travelService.getSumPlaces(item,this.requestsArr);
    if(this.thisTravel==item){
        sum -= this.placesOfUser;
    }
    return sum <= 0;
  }

  AddUserToTravel(item:Travels){
    if(this.placesOfUser<1){
      this.PlaceAlert();
      return;
    }
    let requestCode:number;
    this.requestService.getId().subscribe(
      (requestId)=>{
        requestCode=requestId; 
        //console.log(requestCode);
        let UserId=JSON.parse(localStorage.getItem("user")).UserId;
        // let SourceAddress=document.getElementById("SourceAddress").value;
        // let DestinationAddress=document.getElementById("DestinationAddress").value;
        let request:Request=new Request(requestCode,UserId,this.SourceAddress,
        this.DestinationAddress,item.Date,"","",this.placesOfUser,null);
        this.requestService.AddRequest(request);  
        this.messegeService.getMessegeCode().subscribe(
          (messegeCode)=>{
             let messege:Messege=new Messege(messegeCode,item.TravleCode+"-"+requestCode,item.UserId,true);
             this.messegeService.addMessege(messege);
             console.log(true);
          },
          (e)=>{console.log(false);}
        )
      },
      (err)=>{
          console.log('No Request found!');
      }
    ); 
    
  }
getMaxPlace(item:Travels):number{
  return this.travelService.getSumPlaces(item,this.requestsArr);
  
}
async PlaceAlert(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'The number of places should be greater than 0',
    //subHeader: 'Subtitle',
 
    buttons: ['OK']
  });

  await alert.present();
}
async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'The group has been added to your group list',
    //subHeader: 'Subtitle',
    message: 'To enter it go to the menu',
    buttons: ['OK']
  });

  await alert.present();
}
async presentExitAlert(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'You belong to this group',
    //subHeader: 'Subtitle',
    message: 'To enter it go to the menu',
    buttons: ['OK']
  });

  await alert.present();
}
AddGroup(TravelCode:number){
  debugger;
  let group:Groups=new Groups(TravelCode,this.thisUser.UserId,false);
  this.commentsSerice.getGroups().subscribe(
    (gg)=>{
      console.log(gg);
      let g=gg.find(element=>element.UserId==group.UserId && element.TravelCode==group.TravelCode);
      if(g==null){
        this.commentsSerice.AddGroup(group);
        this.presentAlert();
      }
      else{
        this.presentExitAlert();
      }
    }
  )
  
  

}
  rCode: number = null;
  f(rCode) {
    this.rCode = this.rCode != rCode ? rCode : null;
    this.placesOfUser=0;
  }
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.travelsArr = this.travelsAllArr.filter((item) => {
        return (item.SourceAddress.toLowerCase().indexOf(val.toLowerCase()) > -1||
        item.DestinationAddress.toLowerCase().indexOf(val.toLowerCase()) > -1||
       String(item.Date).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.travelsArr=this.travelsAllArr;
    }
  }
  GO(){
    this.router.navigateByUrl("/requests");
  }
}
