import { Component, OnInit } from '@angular/core';
import { Travel } from '../travel';
import { TravelService } from '../servises/travel.service';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from '../servises/drivers.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss'],
})
export class TravelsComponent implements OnInit {
 travelArr:Travel[]=new Array();
  constructor(private driversService:DriversService,private travelService:TravelService,private activatedRoute:ActivatedRoute) { }
x:number=0;
  ngOnInit() {
     //this.travelArr=this.travelService.getTravels();
    // let id=this.driversService.getId();
    // this.travelArr=this.travelService.getTravelsById(id);


  //  console.log( this.activatedRoute.paramMap.subscribe(res=>
  //   res.get("id")));
  console.log(this.x);

    // this.activatedRoute.paramMap.subscribe(res=>
    //   this.x= Number(res.get("id")) );
      console.log(this.x);
  }

}
