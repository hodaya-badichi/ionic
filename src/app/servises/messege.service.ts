import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Messege } from '../class/messege';

@Injectable({
  providedIn: 'root'
})
export class MessegeService {

  constructor(private http: HttpClient) { }
  getMessegeArrByUserId(userId:string){
    return this.http.get<Messege[]>("http://localhost:54736/api/Messege/getMessegeArrByUserId/"+userId);
  }
  getMessegeArr(){
    return this.http.get<Messege[]>("http://localhost:54736/api/Messege/getMessegeArr");
  }
  addMessege(messege:Messege){
    console.log(messege);
    this.http.post("http://localhost:54736/api/Messege/addMessege",messege).subscribe(
       (res)=>{
         console.log(res);
       },
       (e) => 
       {
         console.log('ERR!');
       }
       
     );
  }
  delMessege(messegeCode:string){
    return this.http.delete("http://localhost:54736/api/Messege/delMessege/"+messegeCode);
  }
  getMessegeCode(){
    return this.http.get<string>("http://localhost:54736/api/Messege/GetLastMessegeCode");   
  }
}
