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
    this.requestsArr.push(new Request(1,"123456789","bneybrak","jerusalem",new Date(),"dst","csa",null));
    this.requestsArr.push(new Request(2,"123456780","roshhain","jerusalem",new Date(),"skmq","sdav",null));
  }
  getAllRequests():Request[]{
    return this.requestsArr;
  }
  getRequests():Request[]{
    return this.requestsArr.filter(element=>element.TravelCode==null);
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
