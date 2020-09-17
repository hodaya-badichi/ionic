import { Component, OnInit } from '@angular/core';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { RequestService } from '../servises/request.service';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.scss','../app.component.scss'],
})
export class ListDriverComponent implements OnInit {
  UsersArr:User[]=[];
  travelCode:number=null;

  constructor(private userServeice:UserService,private requestService:RequestService,
     private router: Router,private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
   
    this.activatedRoute.paramMap.subscribe(res => {
      this.travelCode=res.get("TravelCode")!=null? Number(res.get("TravelCode")):null;
      this.userServeice.getUsers().subscribe(
        (users)=>{
          if(this.travelCode==null)
            this.UsersArr=users.filter(element=>element.IsDriver);
          else{
            this.requestService.getRequests().subscribe(
              (requests)=>{
                requests=requests.filter(element=>element.TravelCode && element.TravelCode==this.travelCode);
                requests.forEach(elementr => {
                   this.UsersArr.push(users.find(element=>element.UserId==elementr.UserId));
                });
              }
            )
           
          }
            
        },
        (e)=>{console.log("errr: "+ e )}
      );
    });

  }
  GO(){
    this.router.navigateByUrl("/requests");
  }
}
