import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';
import { CommentsService } from '../servises/comments.service';
import { Comments } from '../class/comments';
import { ThrowStmt } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss','../app.component.scss'],
})
export class ChatComponent implements OnInit {

  messages:Comments[];
  thisUser:User;
  travelCode:number;
  newMsg:string= '';
  @ViewChild ("scrollElement",{static:true}) content: IonContent;
  constructor( private router: Router,private userService:UserService,private commantsService:CommentsService
    ,private activatedRoute: ActivatedRoute) {
    this.thisUser=JSON.parse(localStorage.getItem("user"));
   }
   getMessages() {
    setInterval(()=> this.commantsService.getCommentsById(this.travelCode).subscribe(
      (comments)=>{
        var len= 0;
        if(this.messages) 
        {
          len = this.messages.length;
        }
        var newLen=comments.length;
        this.messages=comments;
       
          setTimeout(() => {
            if(len!= newLen)            
              this.updateScroll();
        }, 500);
        
      
        //this.content.scrollToBottom(0);
      },
      (e)=>{}
    ),500);
}
getContinu(m:Comments){
 let i= this.messages.findIndex(element=>element.CommentId==m.CommentId);
 return i==0 || this.messages[i].UserId!=this.messages[i-1].UserId;
}
updateScroll() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom(100);
    }
}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.travelCode=res.get("TravelCode")!=null? Number(res.get("TravelCode")):null;
      this.getMessages();
    });
  }

  sendMessage(){
    this.commantsService.getLength().subscribe(
      (commentCode)=>{
        let comment:Comments=new Comments(commentCode,this.thisUser.UserId,this.travelCode,this.newMsg,new Date()
         ,this.thisUser.UserFirstName);
        this.commantsService.AddComments(comment); 
         this.newMsg='';
    setTimeout(()=>{
      this.updateScroll();
    }, 500);
      }
    )
  }

  GO(){
    this.router.navigateByUrl("/requests");
  }
}
