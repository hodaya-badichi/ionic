import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../class/request';
import { request } from 'http';
import { element } from 'protractor';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

requestsArr:Request[];

  constructor(private http: HttpClient) { 
    
  }
  
  getRequstLength(){
   return this.http.get<number>("http://localhost:54736/api/Request/getLength");
    
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
  UpdateRequest(requestCode:number,travelCode:number){
   let codes=new Array();
   codes[0]=requestCode;
   codes[1]=travelCode;
    this.http.post("http://localhost:54736/api/Request/UpdateRequest",codes).subscribe(
      (res)=>{
        alert(res);
      },
      (e) => 
      {
        alert('ERR!');
      }
      
    );
  }

  getId(){
    return this.http.get<number>("http://localhost:54736/api/Request/getLastRequestCode");   
  }
  AddRequest(request:Request):void{
    //console.log(request);
    this.http.post("http://localhost:54736/api/Request/addRequest",request).subscribe(
      (res)=>{
        console.log(res);
      },
      (e) => 
      {
        console.log('ERR!');
      }
      
    );
  }
  DelRequest(requestCode:number){
    return this.http.delete("http://localhost:54736/api/Request/delRequest/"+requestCode);
  }

  // UpDateTheRequest(request:Request,travelCode:number):Request{
  //   this.requestsArr.forEach(element => {
  //     if(element.RequestCode==request.RequestCode)
  //       return element.TravelCode=travelCode;
  //   });
  //   return request;
  // }
}