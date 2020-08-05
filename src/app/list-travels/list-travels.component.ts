import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { RequestService } from '../servises/request.service';

@Component({
  selector: 'app-list-travels',
  templateUrl: './list-travels.component.html',
  styleUrls: ['./list-travels.component.scss'],
})
export class ListTravelsComponent implements OnInit {
thisUser:User;
travelArr:Travels[]=[];
  constructor(private userService:UserService,private travelService:TravelsService,private requestService:RequestService) { }

  ngOnInit() {
     this.thisUser=this.userService.thisUser;
    this.travelArr=this.travelService.getTravelsArr();
  }

}
