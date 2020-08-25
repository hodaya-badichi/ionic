import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../servises/request.service';
import { Request } from '../class/request';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';
import { AlertController } from '@ionic/angular';
import { element } from 'protractor';
import { equal } from 'assert';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-travels-of-request',
  templateUrl: './travels-of-request.component.html',
  styleUrls: ['./travels-of-request.component.scss','../app.component.scss'],
})
export class TravelsOfRequestComponent implements OnInit {
 request:Request=null;
 travelsArr:Travels[]=[];
 DriversArr:Travels[]=[];
 thisUser:User;
 numsOfPassengers:number=0;
  constructor(private activatedRoute:ActivatedRoute,private requestService:RequestService,private travelsService:TravelsService
    ,private userService:UserService,public alertController: AlertController,private router:Router) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(res => {
    
     this.request= this.requestService.getARequastById(Number(res.get("RequestCode")));        
    });
    //alert(this.request.RequestCode);
    //this.travelsArr=this.travelsService.getTravelsOfRequest(this.request);
    // this.DriversArr=this.travelsArr.filter(element=>element.IsDriver);
    this.travelsArr=this.travelsService.getTravelsArr();
    this.thisUser=this.userService.getThisUser();
  
  }
  getCode():number{
    let max:number=0;
    this.travelsArr.forEach(element => {
      max=element.TravleCode>max?element.TravleCode:max;
    });
    return max;
  }
  async AddTravelOfThisRequest(){
    const alert = await this.alertController.create({
          header: 'מס מקומות פנויים ברכב',
          inputs:[
            {
              name: 'NumOfPassengers',
              id:'NumOfPassengers',  
              type: 'number',
              min: 1,              
              value:0,                     
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Okay',
              handler: (alertData) => {
                console.log("v");
                let NumOfPassengers=Number(alertData.NumOfPassengers);
                let t:Travels=new Travels(this.getCode(),this.thisUser.UserId,this.request.Date,
                this.request.SourceAddress, this.request.DestinationAddress,NumOfPassengers);
                this.travelsArr=this.travelsService.AddTravelOfThisRequest(t);
                this.requestService.UpDateTheRequest(this.request,t.TravleCode);
              }
            }
          ]
          
        });
        
        await alert.present(); 
  }

  // getName(idUser:string):string{
  //   let u:User= this.userService.getUserById(idUser);
  //   return u.UserFirstName+" "+u.UserLastName+"  ";
  // }
  // getCnt(travel:Travels):number{
  //   let cnt:number=0;
  //    this.travelsArr.forEach(element => {
  //      cnt+=element.TravleCode==travel.TravleCode?1:0;
  //    });
  //    return cnt;
  // }
  // AddTravelOfThisRequest(){
  //   this.travelsService.AddTravelOfThisRequest(this.thisUser.UserId,this.request,this.numsOfPassengers);
  // }
  // getMax(travel:Travels):number{
  //   try{
  //     return travel.NumOfPassengers;
  //   }
  //   catch{
  //     return 5;
  //   }
    
  // }
  // Del(travel:Travels){
  //   if(travel.UserId!=this.thisUser.UserId)
  //      this.AlertDel(travel);
  // }
  // getCntOfUser(travel:Travels):number{
  //  return 0;
  // }
  // async AlertDel(travel:Travels){
  //   const alert = await this.alertController.create({
  //     header: '',
  //     message:'מחק את מספר הנוסעים',
  //     inputs:[
  //       {
  //         name: 'number',
  //         type: 'number',
  //         min: 1,
  //         max:this.getMax(),
  //         value:this.getCntOfUser(travel)
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]    
  //   });
  //   await alert.present();     
  // }
  //mumOfPassengers:number;
 // async Add(travel:Travels) {
  // let t:Travels=this.travelsArr.find(element=>element.UserId==this.thisUser.UserId && element.TravleCode==travel.TravleCode);
  // let t:Travels=null;  
  // const alert = await this.alertController.create({
  //     header: 'הצטרף',
  //     inputs:[
  //       {
  //         name: 'NumOfPassengers',
  //         id:'NumOfPassengers',

  //         type: 'number',
  //         min: 1,
  //         max:this.getMax(travel),
  //         value:t!=null?t.NumOfPassengers:0,
                   
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: (alertData) => {
  //           console.log("v");
  //           let NumOfPassengers=Number(alertData.NumOfPassengers);
         
  //           if(t==null)
  //             t=this.travelsService.AddUserOfThisTravel(travel,this.thisUser.UserId,NumOfPassengers);
  //           else{
  //             t.NumOfPassengers=NumOfPassengers;
  //             this.travelsService.UpDateUserOfThisTravel(t);
  //           }
  //         }
  //       }
  //     ]
      
  //   });
  //   await alert.present(); 
  //   if(this.travelsArr.find(element=>equal(t,element))!=null)
  //     console.log("true");
  //     else
  //     console.log("false");

  // }
}
