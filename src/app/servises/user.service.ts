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
      // let u1:User=new User("123456789","hodaya","badichi","hodaya193000@gmail.com","1234","0548598769",true);
      // let u2:User=new User("123456780","leah","pinchsov","leahp@gmail.com","123456","0548598768",false);
      // let u3:User=new User("123456781","rut","lando","rut@gmail.com","1234567","0548598768",true);
      // let u4:User=new User("123456782","yael","vinograd","yael@gmail.com","1234568","0548598768",false);
      // this.users.push(u1);
      // this.users.push(u2);
      // this.users.push(u3);
      // this.users.push(u4);

   }
  //  public uploadImage(file: File, id: number): Observable<ArrayBuffer> {
 
  //   let input = new FormData();
  //   input.append('file', file, file.name);
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   let options = { headers: headers };

  //   return this.http.post<ArrayBuffer>(`http://localhost:60876/api/Hospital/upload/${id}`, input, options);
  // }
  getUsers(){
    return this.http.get<User[]>("http://localhost:54736/api/Users/getUsers"); 
   }
   getPassword(email:string){
    
    return this.http.get<boolean>("http://localhost:54736/api/SendEmail/SendEmailForPassword/"+email); 
   }
   register(user:User){      
     this.http.post("http://localhost:54736/api/Users/register",user).subscribe(
       (res)=>{
         console.log(res);
       },
       (e) => 
       {
         console.log('ERR!');
       }
       
     );
    
  //  this.thisUser=user;
    //this.users.push(user);
    }
    Login(idUser:string,password:string){
    return this.http.get<User>("http://localhost:54736/api/Users/login/"+idUser+"/"+password); 
    // this.thisUser= this.users.find(x=>x.UserId==idUser&&x.UserPassword==password&&x.IsDriver==isDriver);
    // return this.thisUser;
    }
    getThisUser():User{
      return this.thisUser;
    }
    getUserById(idUser:string){     
      return this.http.get<User>("http://localhost:54736/api/Users/getUserById/"+idUser); 
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
