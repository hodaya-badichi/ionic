import { Component, OnInit,ViewChild,ElementRef, NgZone } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';
import { MapsAPILoader, AgmMap } from '@agm/core';
//import { ViewEncapsulation } from '@angular/compiler/src/core';
//import { Location,Appearance, GermanAddress } from '@angular-material-extensions/google-maps-autocomplete';
//import PlaceResult = google.maps.places.PlaceResult;
import { Title } from '@angular/platform-browser';
import { RequestService } from '../servises/request.service';
import { TravelsService } from '../servises/travels.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Request } from '../class/request';
import { Travels } from '../class/travels';
//declare var google: any;
@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['../app.component.scss','./requests.page.scss'],
  //encapsulation: ViewEncapsulation.None,
})

export class RequestsPage implements OnInit {
  
  thisUser:User=null;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  rDLength:number;
  tDLength:number;
  isDriver:boolean;
  requestArr:Request[];
  travelsArr:Travels[];
  value:string="Add Request";
  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  journeySearch: any;
  constructor(public navCtrl: NavController, public platform: Platform,    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,  private menu: MenuController,private router:Router,
  private requestService:RequestService,private travelsService:TravelsService) {
    ///שליפת הנתונים מה localStorage
    this.thisUser=JSON.parse(localStorage.getItem("user"));
    this.isDriver=JSON.parse(localStorage.getItem("isDriver"));
    if(this.isDriver)
      this.value="Add Travel";
    this.requestService.getRequests().subscribe(
      (requests)=>{
        this.requestArr=requests;
        this.requestFunc();
      }
    );
  
    this.travelsService.getTravelsArr().subscribe(
      (travel)=>{
        this.travelsArr=travel;
       this.travelFunc();
      }
    )
   }
requestFunc(){
  if(this.isDriver)
  this.rDLength=this.requestArr.filter(element=>element.TravelCode==null).length;
else
  this.rDLength=this.requestArr.filter(element=>element.UserId==this.thisUser.UserId).length;
}  
travelFunc(){
  if(this.isDriver)
  this.tDLength=this.travelsArr.filter(element=>element.UserId==this.thisUser.UserId).length;
else
  this.tDLength=this.travelsArr.length;
}
back(){
  localStorage.clear();

  this.router.navigateByUrl("/taxi");
}
changeType(){
  if(this.thisUser.IsDriver){
    localStorage.setItem("isDriver", JSON.stringify(!this.isDriver));
    this.isDriver=JSON.parse(localStorage.getItem("isDriver"));
    this.value=this.isDriver?"Add Travel":"Add Request";
    this.travelFunc();
    this.requestFunc();
  }
}
    ngOnInit(){ }
}
