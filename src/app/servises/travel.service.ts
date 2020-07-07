import { Injectable } from '@angular/core';
import { Travel } from '../travel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
travelArr:Travel[]=new Array()

  constructor(private http: HttpClient) { 
    this.travelArr.push(new Travel(this.travelArr.length,12,"asd"));
    this.travelArr.push(new Travel(this.travelArr.length,20,"1234"));
    this.travelArr.push(new Travel(this.travelArr.length,12,"12345"));
  }
  getTravels():Travel[]{
    return this.travelArr;
  }
  getTravelsById(id:number):Travel[]{
    let arr=this.travelArr.filter(res=>res.idDriver==id);
    return arr;
  }
}
