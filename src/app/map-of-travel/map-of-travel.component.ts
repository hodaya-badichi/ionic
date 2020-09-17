import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TravelsService } from '../servises/travels.service';
import { Travels } from '../class/travels';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { RequestService } from '../servises/request.service';
import { Request } from '../class/request';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';
import { MessegeService } from '../servises/messege.service';
import { Messege } from '../class/messege';

declare const google: any;
@Component({
  selector: 'app-map-of-travel',
  templateUrl: './map-of-travel.component.html',
  styleUrls: ['../app.component.scss','./map-of-travel.component.scss'],
})
export class MapOfTravelComponent implements OnInit, AfterViewInit {
  travel: Travels = null;
  map: any;
  stations: any[] = null;
  isDriver: boolean;
  isMessege:boolean=false;
  constructor(private travelsService: TravelsService, private mapsAPILoader: MapsAPILoader
    , private router: Router, private activatedRoute: ActivatedRoute,private messegeService:MessegeService,
     private requestServeice: RequestService,private userService:UserService) { }
  ngAfterViewInit(): void {
    // Load google maps script after view init
    // const DSLScript = document.createElement('script');
    // tslint:disable-next-line:max-line-length
    //   DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB7FXQhE0DhQRyTX6wDCM3Ix3ASCPF6LFI&language=iw'; // replace by your API key
    //   DSLScript.type = 'text/javascript';
    //  document.body.appendChild(DSLScript);

  }
  travelCode: number;
  getIsStation(item: string) {
    let id: string = JSON.parse(localStorage.getItem("user")).UserId;
    return this.requests.find(element => element.UserId == id && (element.DestinationAddress == item ||
      element.SourceAddress == item)) != null;
  }


  requests: Request[];
  ngOnInit() {
    this.isDriver = JSON.parse(localStorage.getItem("isDriver"));
    this.activatedRoute.paramMap.subscribe(res => {
      this.travelCode = Number(res.get("TravelCode"));
    });
    this.travelsService.getTravelsArr().subscribe(
      (travels) => {

        this.travel = travels.find(element => element.TravleCode == this.travelCode);
        console.log(this.travel);

        this.requestServeice.getRequests().subscribe(
          (requestsArr) => {
            this.requests = requestsArr.filter(element => element.TravelCode && element.TravelCode == this.travelCode);
            console.log(this.requests);
            this.mapsAPILoader.load().then(() => { this.initMap(); });
          }
        );

      });


  }
  initMap(): void {
    let self = this;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    //this.travel.SourceAddress
    this.map = new google.maps.Map(
      document.getElementById("gmap") as HTMLElement,
      {
        zoom: 10,
        center: { lat: 32.005532, lng: 34.8875999 }
      }
    );
    directionsRenderer.setMap(this.map);
    let waypoints = [];
    for (let i = 0; i < self.requests.length; i++) {
      if (self.requests[i].SourceAddress != self.travel.SourceAddress)
        waypoints.push({ location: self.requests[i].SourceAddress });
      if (self.requests[i].DestinationAddress != self.travel.DestinationAddress)
        waypoints.push({ location: self.requests[i].DestinationAddress });
    }

    // for (const way in self.requests) {


    // waypoints.push({location:'המ"ג 15, ירושלים'});
    // waypoints.push({location:'מבשרת ציון, ישראל'});
    // waypoints.push({location:'בית שערים 2, ירושלים'});
    // waypoints.push({location:'בית לחם, ישראל'});

    //}
    this.calculateDistances(directionsService, directionsRenderer
      , this.travel.SourceAddress, waypoints, waypoints.length)
    // const onChangeHandler = function() {
    //   this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    //   };

  }
  calculateDistances(directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    pt, closest, numberOfResults) {
    let self = this;
    var service = new google.maps.DistanceMatrixService();
    var request = {
      origins: [pt],
      destinations: [],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    };
    if (closest && closest.length > 0) {

      for (var i = 0; i < closest.length; i++) {
        request.destinations.push(closest[i].location);
      }
      service.getDistanceMatrix(request, function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;


          var results = response.rows[0].elements;
          // save title, address and index of marker in record for sorting
          for (var i = 0; i < closest.length; i++) {
            //  results[i].title = closest[i].title;
            results[i].address = closest[i].location;
            //     results[i].idx_closestMark = i;
          }
          results.sort(self.sortByDistDM);
          let result2 = [];
          for (var i = 0; ((i < numberOfResults) && (i < closest.length)); i++) {

            result2.push({ location: results[i].address });

          }
          if(self.stations==null){
             self.stations = new Array();
             result2.forEach(element => {
               if(! self.stations.find(el=>element!=el && element.location==el.location))
                  self.stations.push(element);
             });
          }
           
          //   console.log(this.stations[0].location);
          self.calculateAndDisplayRoute(directionsService, directionsRenderer, result2);

        }
      });

    }
    else {
      self.calculateAndDisplayRoute(directionsService, directionsRenderer, []);
    }

  }

  sortByDistDM(a, b) {
    return (a.distance.value - b.distance.value)
  }
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    waypoints: google.maps.DirectionsWaypoint[]
  ) {
    let self = this;


    directionsService.route(
      {
        origin: {
          query: self.travel.SourceAddress
        },
        destination: {
          query: self.travel.DestinationAddress
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  GO() {
    this.router.navigateByUrl("/requests");
  }
  temp: Request[] =null;
  b: boolean = false;
  itemClick1 = null;
  itemClick2 = null;
  r:Request=null;
  userClick:User=null
  func(s: string) {
    if (!this.isDriver)
      return;
    if (this.temp==null) {
      debugger;
      this.temp = this.requests;
       this.r = this.requests.find(element => element.DestinationAddress == s || element.SourceAddress == s);
      this.userService.getUserById(this.r.UserId).subscribe(
        (user)=>{this.userClick=user; });
      this.itemClick1 = this.stations.find(element => element.location == this.r.SourceAddress);
      this.itemClick2 = this.stations.find(element => element.location == this.r.DestinationAddress);
      this.requests = this.requests.filter(element => element.DestinationAddress != s && element.SourceAddress != s);
    }
    else {
      this.requests = this.temp;
      this.temp = null;
      this.itemClick1 = this.itemClick2 = null;
      this.userClick=null;
    }
    this.b = !this.b;
    this.mapsAPILoader.load().then(() => { this.initMap(); });
  }
  sendMessege(){
    
    this.messegeService.getMessegeCode().subscribe(
      (messegeCode)=>{
        console.log(messegeCode);
        
        let summery=document.getElementById("summery").value;
         let messege:Messege=new Messege(messegeCode,this.r.TravelCode+"-"+this.r.RequestCode,this.r.UserId,false,summery);      
         this.messegeService.addMessege(messege); 
         this.isMessege=false;      
      }       
    )
  }
}
