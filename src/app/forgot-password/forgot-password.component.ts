import { Component, OnInit} from '@angular/core';
import{EmailComposer}from '@ionic-native/email-composer/ngx'
import { UserService } from '../servises/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss','../app.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {


email:string="";
  constructor(private composer:EmailComposer,private userService:UserService,private alertController:AlertController) { }

  ngOnInit() {}
  async alertNewUser(){
    const alert = await this.alertController.create({
      header: 'אינך קיים במערכת',
      message:'אנא הצטרף כמשתמש חדש',     
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
      
    });
    await alert.present(); 
  }
  async alertUser(){
    const alert = await this.alertController.create({
      header: 'הסיסמא נשלחה למייל',
      message:'',     
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
      
    });
    await alert.present(); 
  }

  getPassword(){
   
    this.userService.getPassword(this.email).subscribe(
      (res)=>{
        if(!res)
          this.alertNewUser();
        else
          this.alertUser();
      }
    );
  }
}