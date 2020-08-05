import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';
import { Travels } from '../class/travels';

@Injectable({
  providedIn: 'root'
})
export class UserService {
users:User[]=new Array();
thisUser:User;
  constructor(private http: HttpClient) {
      let u1:User=new User("123456789","hodaya","badichi","hodaya193000@gmail.com","1234","0548598769",true);
      let u2:User=new User("123456780","leah","pinchsov","leahp@gmail.com","123456","0548598768",false);
      let u3:User=new User("123456781","rut","lando","rut@gmail.com","1234567","0548598768",true);
      let u4:User=new User("123456782","yael","vinograd","yael@gmail.com","1234568","0548598768",false);
      this.users.push(u1);
      this.users.push(u2);
      this.users.push(u3);
      this.users.push(u4);

   }
   register(user:User){      
     //return this.http.post<User>("http://localhost:54736/api/User/register",user);
    this.thisUser=user;
    this.users.push(user);
    }
    Login(idUser:string,password:string,isDriver:boolean):User{
    //return this.http.get<User>("http://localhost:54736/api/User/login/"+idUser+"/"+password); 
    this.thisUser= this.users.find(x=>x.UserId==idUser&&x.UserPassword==password&&x.IsDriver==isDriver);
    alert(this.thisUser);
      return this.thisUser;
    }
    getThisUser():User{
      return this.thisUser;
    }
    getUserById(idUser:string):User{
      //return this.http.get<User>("http://localhost:54736/api/User/login/"+idUser+"/"+password);   
        return this.users.find(x=>x.UserId==idUser);
      }
    // getDriversOfRequest(TravelsArr:Travels[]):User[]{
    //   let Drivers:User[]=new Array();
    //   TravelsArr.forEach(element => {
    //     if(element.IsDriver==true)
    //       Drivers.push(this.getUserById(element.UserId));
    //   });
    //   return Drivers;
   // }
  }
