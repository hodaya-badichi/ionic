import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';

@Component({
  selector: 'app-travels-of-driver',
  templateUrl: './travels-of-driver.component.html',
  styleUrls: ['./travels-of-driver.component.scss'],
})
export class TravelsOfDriverComponent implements OnInit {
thisUser:User;
travelArr:Travels[]=[];
  constructor(private userService:UserService,private travelService:TravelsService) { }

  ngOnInit() {
     this.thisUser=this.userService.thisUser;
     this.travelArr=this.travelService.getTravelsOfDriver(this.thisUser.UserId);
    
  }

}
