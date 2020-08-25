import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../class/request';
import { request } from 'http';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

requestsArr:Request[]=new Array();

  constructor(private http: HttpClient) { 
    // this.requestsArr.push(new Request(1,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    // this.requestsArr.push(new Request(2,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
    // this.requestsArr.push(new Request(3,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    // this.requestsArr.push(new Request(4,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
    // this.requestsArr.push(new Request(5,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    // this.requestsArr.push(new Request(6,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
    // this.requestsArr.push(new Request(7,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    // this.requestsArr.push(new Request(8,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
    // this.requestsArr.push(new Request(9,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    // this.requestsArr.push(new Request(10,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
    // this.requestsArr.push(new Request(11,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    // this.requestsArr.push(new Request(12,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
  }
 private getCode():number{
   let max:number=0;
   this.requestsArr.forEach(element => {
     max=element.RequestCode>max?element.RequestCode:max;
   });
   return max;
  }
  AddUserToTravel(re:Request,UserId:string):void{
      let r:Request=new Request(this.getCode(),UserId,re.SourceAddress,re.DestinationAddress
      ,re.Date,re.Frequency,re.Summarry,re.TravelCode);
      this.requestsArr.push(r);
  }
  getRequestOfTheTravel(tarvelCode:number):Request{
    return this.requestsArr.find(element=>element.TravelCode&&element.TravelCode==tarvelCode);
  }
  getAllRequests():Request[]{
    return this.requestsArr;
  }
  getRequests(){
     return this.http.get<Request[]>("http://localhost:54736/api/Request/getRequests");
     
  
  }
  getId():number{
    let max:number=0;
    this.requestsArr.forEach(element => {
      max=element.RequestCode>max?element.RequestCode:max;
    });
    return ++max;
  }
  AddRequest(request:Request):void{
    this.requestsArr.push(request);
  }
  getARequastById(RequestCode:number):Request{
    return this.requestsArr.find(element=>element.RequestCode==RequestCode);
  }
  UpDateTheRequest(request:Request,travelCode:number):Request{
    this.requestsArr.forEach(element => {
      if(element.RequestCode==request.RequestCode)
        return element.TravelCode=travelCode;
    });
    return request;
  }
}