import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Request } from '../class/request';
import { RequestService } from '../servises/request.service';
import { request } from 'http';
import { MenuController, NavController, ActionSheetController, Platform, AlertController } from '@ionic/angular';
import { bindCallback } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../class/user';
import { element } from 'protractor';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { CommentsService } from '../servises/comments.service';
import { Groups } from '../class/groups';
import { Messege } from '../class/messege';
import { MessegeService } from '../servises/messege.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['../list-travels/list-travels.component.scss', './list-request.component.scss', '../app.component.scss'],
})
export class ListRequestComponent implements OnInit, AfterViewInit {
  private geoCoder;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  journeySearch: any;
  hospitalLatLng: string;
  requestsArr: Request[];
  requestsAllArr: Request[];
  thisUser: User = null;
  s: number = 0;
  SourceAddress: string;
  DestinationAddress: string;
  tempTravelsUser: Travels[] = null;
  TravelsArrOfUser: Travels[] = null;
  TravelsArr: Travels[] = null;
  placesOfUser: number;
  price: number;
  isDriver: boolean;
  constructor(public navCtrl: NavController, public platform: Platform, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public actionSheetController: ActionSheetController, private activatedRoute: ActivatedRoute,
    private requestService: RequestService, private commentsSerice: CommentsService,public alertController: AlertController,
    private router: Router, private travelService: TravelsService,private messegeService:MessegeService) {
  }
  isPase(d) {
    let today: Date = new Date();
    let date = new Date(d);
    return today.getTime() < date.getTime();
  }
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.requestsArr = this.requestsAllArr.filter((item) => {
        return (item.SourceAddress.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.DestinationAddress.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          String(item.Date).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.requestsArr = this.requestsAllArr;
    }
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    if (ev.detail.value == 'Travels')
      this.requestsArr = this.requestsAllArr.filter(element => element.TravelCode != null);
    if (ev.detail.value == 'Requests')
      this.requestsArr = this.requestsAllArr.filter(element => element.TravelCode == null);
    if (ev.detail.value == 'All')
      this.requestsArr = this.requestsAllArr;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.TravelCode === o2.TravelCode : o1 === o2;
  };
  select: string = "";
  ff() {
    console.log(this.select);
  }
  compareWith = this.compareWithFn;
  ngAfterViewInit() {

  }
  RefreshRequestArr() {
    this.requestService.getRequests()
      .subscribe(
        (request) => {
          this.requestsArr = request.filter(x=> this.isPase(x.Date));
          let r2:Request[]=request.filter(x=> !this.isPase(x.Date)).reverse();
          request=this.requestsArr=this.requestsArr.concat(r2);
          this.requestsAllArr = this.requestsArr = this.requestsArr.filter(element => element.TravelCode == null);
          if (!this.isDriver)
            this.requestsAllArr = this.requestsArr = request.filter(element => element.UserId == this.thisUser.UserId);
          
        },
        (e) => {
          console.log('No Request found!');

        }
      );
  }
  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem("user"));
    this.isDriver = JSON.parse(localStorage.getItem("isDriver"));
    this.RefreshRequestArr();
    this.travelService.getTravelsArr().subscribe(
      (travelsArr) => {
        this.TravelsArr = travelsArr;
        this.tempTravelsUser = travelsArr.filter(element => element.UserId == this.thisUser.UserId);
      }
    )
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

  thisTravel: Request = null;
  animtion(item: Request) {
    this.thisTravel = item;

    setTimeout(() => {
      let input_from: HTMLInputElement = (<HTMLInputElement>document.getElementById("SourceAddress"));
      let input_from2: HTMLInputElement = (<HTMLInputElement>document.getElementById("DestinationAddress"));
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
    
      (<HTMLInputElement>document.getElementById("SourceAddress")).value=item.SourceAddress;
     
    (<HTMLInputElement>document.getElementById("DestinationAddress")).value=item.DestinationAddress;
      


      //     });
    }, 1000);

  }
  clickRequest:Request=null;
  SelectTravel(item:Request) {
    this.clickRequest=item;
    this.TravelsArrOfUser = this.tempTravelsUser.filter(x=>this.isPase(x.Date));
  
  }

  rCode: number = null;

  f(rCode) {
    this.rCode = this.rCode != rCode ? rCode : null;
  }
  AddNewTravel(item: Request) {
    let travelCode: number;
    ///החזרת הקוד האחרון ברשימת הנסיעות 
    this.travelService.getId().subscribe(
      (tCode) => {
        travelCode = tCode;
        ///יצירת נסיעה חדשה ע"פ הנתונים שהתקבלו
       
        let travel: Travels = new Travels(travelCode, this.thisUser.UserId, item.Date, this.SourceAddress, this.DestinationAddress
          , this.placesOfUser, this.price);
        ///שליחת האובייקט לסרביס שישלח לשרת ע"מ שהנתונים יתמלאו במסד הנתונים
         this.travelService.AddNewTravel(travel);
        ///שליחת עידכון למשתמש על הנסיעה      
        this.messegeService.getMessegeCode().subscribe(
          (messegeCode)=>{
             let messege:Messege=new Messege(messegeCode,travelCode+"-"+item.RequestCode,item.UserId,null);      
             this.messegeService.addMessege(messege);             
          }       
        )
        ///עדכון קוד הנסיעה
       // this.requestService.UpdateRequest(item.RequestCode, travelCode);
        ///הוספת הנהג לצאט
        let group: Groups = new Groups(travelCode, travel.UserId, true);
        this.commentsSerice.AddGroup(group);
      }
    )
  }
  GO() {
    this.router.navigateByUrl("/requests");
  }
 async DelAlert(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'the travel  was successfully deleted!!',
    //subHeader: 'Subtitle',
 
    buttons: ['OK']
  });

  await alert.present();
  }
  Del(item: Request) {
    this.messegeService.getMessegeCode().subscribe(
      (messegeCode)=>{
         let messege:Messege=new Messege(messegeCode,item.NumOfPassengers+"",this.thisUser.UserId,false);      
         this.messegeService.addMessege(messege);             
      }       
    )
    this.requestService.DelRequest(item.RequestCode).subscribe(
      (res)=>{
        this.DelAlert();
         this.RefreshRequestArr();
      }
    );
  }
  getDriverId(TravelCode: number) {
    return this.TravelsArr.find(element => element.TravleCode && element.TravleCode == TravelCode).UserId;
  }
  
  clickTravel:Travels=null;
  func(item:Travels){
    
    this.clickTravel=item;
  }
  getClass(item:Travels){
    return this.clickTravel!=null && this.clickTravel.TravleCode==item.TravleCode;
  }
  async selectAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'select travel',
      //subHeader: 'Subtitle',
   
      buttons: ['OK']
    });
  
    await alert.present();
  }
  Ok(){
    if(this.clickTravel!=null){
    this.messegeService.getMessegeCode().subscribe(
      (messegeCode)=>{
        console.log(messegeCode);
         let messege:Messege=new Messege(messegeCode,this.clickTravel.TravleCode+"-"+this.clickRequest.RequestCode
         ,this.clickRequest.UserId,null);      
         this.messegeService.addMessege(messege);  
         this.TravelsArrOfUser=null           
      }       
    )
  }
  else{
    this.selectAlert();

  }
  }

}
