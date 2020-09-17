import { Component, OnInit } from '@angular/core';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { CommentsService } from '../servises/comments.service';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss','../app.component.scss'],
})
export class GroupsComponent implements OnInit {
  GroupsArr:Travels[]=[];
  thisUser:User;
  clickDel:boolean=false;
  usersArr:User[]=[];
  constructor( private router: Router,private travelService:TravelsService,
    private commentsService:CommentsService,private userService:UserService) { }

  ngOnInit() {
    this.thisUser=JSON.parse(localStorage.getItem("user"));
    this.userService.getUsers().subscribe(
      (users)=>{
        console.log(users);
        this.usersArr=users.filter(element=>element.IsDriver);
      }
    )
    this.commentsService.getGroups().subscribe(
      (groupArr)=>{
        groupArr=groupArr.filter(element=>element.UserId==this.thisUser.UserId);
       this.travelService.getTravelsArr().subscribe(
         (travelArr)=>{
          this.GroupsArr=travelArr.filter(element=>
            groupArr.find(c=>c.TravelCode==element.TravleCode)!=null);    
         }
       )
      }
    ) 
  }
  getNameOfDriver(userId:string):string{
    let u:User= this.usersArr.find(element=>element.UserId==userId);
    
    return u.UserFirstName +' '+ u.UserLastName;
  }
  GO(){
    this.router.navigateByUrl("/requests");
  }
}
