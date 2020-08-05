import { Injectable } from '@angular/core';
import { Travels } from '../class/travels';
import { Request } from '../class/request';
import { element } from 'protractor';
import { equal } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
travelsArr:Travels[]=new Array();
  constructor() {
    // this.travelsArr.push(new Travels(1,1,"123456789",new Date,"",""));
    // this.travelsArr.push(new Travels(1,1,"123456781",new Date,"",""));
    // this.travelsArr.push(new Travels(2,1,"123456781",new Date,"",""));
    // this.travelsArr.push(new Travels(2,1,"123456780",new Date,"",""));

    // this.travelsArr.push(new Travels(3,2,"123456782",new Date,"",""));

   }
   getTravelsById(travelId:number):Travels{
     return this.travelsArr.find(element=>element.TravleCode==travelId);
   }
  getTravelsOfDriver(userId:string):Travels[]{
    return this.travelsArr.filter(element=>element.UserId=userId);
  }
  getTravelsArr():Travels[]{
    return this.travelsArr;
  }
  getTravelsOfRequest(request:Request):Travels[]{
    // return this.travelsArr.filter(element=>element.RequestCode==request.RequestCode);
    return null
  }
  AddUserOfThisTravel(travel:Travels,UserId:string,NumOfPassengers:number):Travels{
    travel.UserId=UserId;
    travel.NumOfPassengers=NumOfPassengers;
    this.travelsArr.push(travel);
    return travel;
  }
  UpDateUserOfThisTravel(travel:Travels):void{
    // let i=this.travelsArr.findIndex(element=>element.UserId==travel.UserId &&
    //   travel.TravleCode==element.TravleCode && element.RequestCode==travel.RequestCode);
    // this.travelsArr[i].NumOfPassengers=travel.NumOfPassengers;
  }
 // AddTravelOfThisRequest(userId:string,request:Request,numOfPassengers:number):void{
    // let max:number=0;
    // this.travelsArr.forEach(element => {
    //   max=element.TravleCode>max?element.TravleCode:max;
    // });
    // max++;
    // this.travelsArr.push(new Travels(max,request.RequestCode,userId,request.Date,request.SourceAddress,request.DestinationAddress,numOfPassengers,true));
    // alert(max+" "+request.RequestCode+" "+userId+" "+request.Date+" "+request.SourceAddress+" "+request.DestinationAddress+" "+numOfPassengers)
  //}
  AddTravelOfThisRequest(travel:Travels):Travels[]{
     this.travelsArr.push(travel);
     return this.travelsArr;
  }
}
