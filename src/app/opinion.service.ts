import { Injectable } from '@angular/core';
import { Opinion } from './class/opinion';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  opinionArr:Opinion[]=new Array();
  constructor(private http: HttpClient) { 
    this.opinionArr.push(new Opinion(1,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    4,true));
    this.opinionArr.push(new Opinion(2,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    1,false));  
      this.opinionArr.push(new Opinion(3,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    3,null));
    this.opinionArr.push(new Opinion(4,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    4,true));
    this.opinionArr.push(new Opinion(5,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    5,false));  
      this.opinionArr.push(new Opinion(6,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    0,null));
    this.opinionArr.push(new Opinion(7,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    4,true));
    this.opinionArr.push(new Opinion(8,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    2,false));  
      this.opinionArr.push(new Opinion(9,"987654321",1,"123456789","אני מאד מרוצה מהנסיעה והנהג",
    3,null));
  }
  getOpinionArr(driverId:string){
    return this.http.get<Opinion[]>("http://localhost:54736/api/Opinion/getOpinionsByDriver/"+driverId);   
  }
  getLastOpinionCode(){
    return this.http.get<number>("http://localhost:54736/api/Opinion/getLastOpinionCode");
  }
  AddOpinion(opinion:Opinion):void{
    this.http.post("http://localhost:54736/api/Opinion/addOpinion",opinion).subscribe(
      (res)=>{
        alert(res);
      },
      (e) => 
      {
        alert('ERR!');
      }
      
    );
  }
}
