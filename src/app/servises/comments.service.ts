import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comments } from '../class/comments';
import { Groups } from '../class/groups';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  AddGroup(userOfGroup:Groups){
    console.log(userOfGroup);
    return this.http.post("http://localhost:54736/api/Groups/addUserToGroup",userOfGroup);
  }
  getGroups(){
    return this.http.get<Groups[]>("http://localhost:54736/api/Groups/getGroups");
  }
  getCommentsById(travelCode:number){
    return this.http.get<Comments[]>("http://localhost:54736/api/Comments/getCommentsById/"+travelCode);
  }
  getComments(){
    return this.http.get<Comments[]>("http://localhost:54736/api/Comments/getComments");
  }
  AddComments(comment:Comments){
      //console.log(request);
      this.http.post("http://localhost:54736/api/Comments/addComment",comment).subscribe(
        (res)=>{
          console.log(res);
        },
        (e) => 
        {
          console.log('ERR!');
        }
        
      ); 
  }
  getLength(){
    return this.http.get<number>("http://localhost:54736/api/Comments/getLength");
  }
}
