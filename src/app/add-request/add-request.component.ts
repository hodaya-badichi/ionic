import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../servises/request.service';
import { UserService } from '../servises/user.service';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
import { Request } from '../class/request';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { Groups } from '../class/groups';
import { CommentsService } from '../servises/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['../app.component.scss','../registration/registration.component.scss','./add-request.component.scss'],
})
export class AddRequestComponent implements OnInit {

  myform:FormGroup;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  thisYear:number=new Date().getFullYear();
  DateTime:Date;
  isDriver:boolean;
  // Frequency:string="dgea";
  private geoCoder;
  Price:number;
  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  journeySearch: any;
   customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
   customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
   customPickerOptions: any;
  constructor(private router: Router,public navCtrl: NavController, public platform: Platform,    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private commentsSerice:CommentsService,public alertController: AlertController,
    public formBuilder:FormBuilder,private requestService:RequestService,
    private travelService:TravelsService,private userService:UserService) { 
      this.customPickerOptions = {

        buttons: [{
          text: 'Save',
          handler: () => console.log('Clicked Save!'+ this.DateTime)
        }, {
          text: 'Log',
          handler: () => {
            console.log('Clicked Log. Do not Dismiss.');
            return false;
          }
        }]
      }
    this.myform=formBuilder.group({
      RequestCode:[''],
      UserId:[''],
      SourceAddress:["",Validators.required],
      DestinationAddress:['',Validators.required], 
      Date:[''], 
      Frequency:["svakjs"],
      Summarry:[''],
      NumOfPassengers:['',Validators.required]
    });
    
  }
 async AdderssAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Destination address and source address must be complete',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async AddTravel(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'added sucssesfuly',
      buttons: ['OK']
    });
  
    await alert.present();
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
  onSubmit() {
  this.myform.value.Date=new Date(document.getElementById("DateTimeInput").value);
  console.log(this.myform.value.Date.getFullYear());
  this.myform.value.UserId=JSON.parse(localStorage.getItem("user")).UserId;
  this.myform.value.NumOfPassengers=(Number)(document.getElementById("NumOfPassengers").value);
    // form.value.DestinationAddress=document.getElementById("DestinationAddress").getAttribute("value");
    // form.value.SourceAddress=document.getElementById("SourceAddress").getAttribute("value");
    if(this.myform.value.SourceAddress==""||this.myform.value.DestinationAddress==""){
      this.AdderssAlert();
      return;
    }
    if(!(this.myform.value.NumOfPassengers>0)){
      this.PlaceAlert();
      return;
    }
    if(!this.isDriver){

   this.requestService.getId().subscribe(
      (requestId)=>{
        this.myform.value.RequestCode=requestId; 
         
      },
      (err)=>{
          console.log('No Request found!');
      }
    );
    this.requestService.AddRequest(this.myform.value);  
    this.AddTravel();
    }
    else{
      let form=this.myform.value;
      this.travelService.getId().subscribe(
        (travelCode)=>{
          this.Price=document.getElementById("Price").value;     
          let travel:Travels=new Travels(travelCode,form.UserId,form.Date,form.SourceAddress,form.DestinationAddress
            ,form.NumOfPassengers,this.Price);
            this.travelService.AddNewTravel(travel);
            this.AddTravel();
            let group:Groups=new Groups(travelCode,form.UserId,true);
            this.commentsSerice.AddGroup(group);
        }
      )
    }
  }
  ngOnInit() {
    this.isDriver=JSON.parse(localStorage.getItem("isDriver"));
    //מעדכן באילו שדות להשתמש בגוגל מאפ
    let input_from:HTMLInputElement = (<HTMLInputElement>document.getElementById("SourceAddress"));
    let input_from2:HTMLInputElement = (<HTMLInputElement>document.getElementById("DestinationAddress"));
   //מעדכן שזה מישראל : IL
    let options = {
      types: [],
      componentRestrictions: {country: "IL"}
    };
    //יוצר שתי מופעים לגוגל מאפ וכך יוכל לדעת להשלים את משתמש
    let autocomplete = new google.maps.places.Autocomplete(input_from, options);
    let autocomplete2 = new google.maps.places.Autocomplete(input_from2, options);
    //ע"מ לישמור את האובייקט הנוכחי עלינו לעשות השמה ל0 this
    let self = this;
//פןנקציה זו אחראית על מילוי שדה המקור
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      let place = autocomplete.getPlace();
      let geometry = place.geometry;
      //בודק אם כבר המשתמש מלא את המקום
      if ((geometry) !== undefined) {
        //אם כן ממלא את השדה במקום שהוא בחר
        self.myform.value.SourceAddress = place.name;
       
      } else {
        //אם לא ממלא אותו במחרוזת ריקה
        self.myform.value.SourceAddress =  '';
      }

    });
///פונקציה זו אחראית על מילוי שדה היעד
    google.maps.event.addListener(autocomplete2, 'place_changed', function() {
      let place = autocomplete2.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {
       self.myform.value.DestinationAddress = place.name;      
      } 
      else {
        self.myform.value.DestinationAddress='';
      }

    });

///מיכוון שזמן הטעינה של גוגל מאפ לוקח זמן 
///צריך לדאוג שהפונקציות הקשורות יתבצעו אחרי אחרי שגמר לטעון 
/// this.mapsAPILoader.load().then
   this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
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
  GO(){
    this.router.navigateByUrl("/requests");
  }
 
}
