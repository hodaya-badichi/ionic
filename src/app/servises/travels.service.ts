import { Injectable } from '@angular/core';
import { Travels } from '../class/travels';
import { Request } from '../class/request';
import { element } from 'protractor';
import { equal } from 'assert';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { request } from 'http';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  travelsArr: Travels[] = new Array();
  constructor(private http: HttpClient) {
  }
  setTravelArr(travelArr: Travels[]): void {
    this.travelsArr = travelArr;
  }
  AddNewTravel(travel:Travels){
    this.http.post("http://localhost:54736/api/travels/addNewTravel",travel).subscribe(
      (res)=>{
        console.log(res);
      },
      (e) => 
      {
        console.log('ERR!');
      }
      
    );
  }
  
  getId(){
    return this.http.get<number>("http://localhost:54736/api/travels/getLastTravelCode");   
  }
  getSumPlaces(item:Travels,requestArr:Request[]):number{
    let cnt:number=0;
    if(requestArr!=null){
    let arr=requestArr.filter(x=>x.TravelCode!=null && x.TravelCode== item.TravleCode);
    arr.forEach(element => {
      cnt+= element.NumOfPassengers;
    });
  }
    return item.NumOfPassengers-cnt;
  }
  getTravelsById(UserId:string){

    return this.http.get<Travels[]>("http://localhost:54736/api/travels/getTravelById/"+UserId);
  }

  getTravelsArr() {  
    return this.http.get<Travels[]>("http://localhost:54736/api/travels/getAllTravels");
  }

  AddUserOfThisTravel(travel: Travels, UserId: string, NumOfPassengers: number): Travels {
    travel.UserId = UserId;
    travel.NumOfPassengers = NumOfPassengers;
    this.travelsArr.push(travel);
    return travel;
  }
  UpDateUserOfThisTravel(travel: Travels): void {
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
  AddTravelOfThisRequest(travel: Travels): Travels[] {
    this.travelsArr.push(travel);
    return this.travelsArr;
  }
}
