import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';
import { RequestService } from '../servises/request.service';
import { Request } from '../class/request';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private travelService:TravelsService,private requestService:RequestService,private userService:UserService) { }
  travel:Travels;
  thisUser:User;
  request:Request;
  ngOnInit() {
    this.thisUser=this.userService.thisUser;
    this.activatedRoute.paramMap.subscribe(res => {
    this.request=this.requestService.getRequestOfTheTravel(Number(res.get("travelCode")));
    this.travel= this.travelService.getTravelsById(Number(res.get("travelCode")));        
   });
   
  }
  AddUserToTravel():void{
     this.requestService.AddUserToTravel(this.request,this.thisUser.UserId);
   }

}
