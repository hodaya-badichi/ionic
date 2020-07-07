import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Driver } from '../driver';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DriversService {
driverArr:Driver[]=new Array();
driver:Driver;
driverId:Driver;
  constructor(private http: HttpClient) { 
    //this.driverArr.push(new Driver("xc","h"));
  }

  register(driver: Driver) {
   // this.driverArr.push(new Driver(driver.EmployeeCode,driver.EmployeeName,driver.,driver.password,driver.email));
    //console.log(driver);   
    //return this.http.post(environment.url + "/register", driver);
  }
  getDriverById(idDriver:string,password:string):Observable<Driver>{
    var c= this.http.get<Driver>("http://localhost:54736/api/Employee/login/"+idDriver+"/"+password);
 debugger;
 return c
  }
}