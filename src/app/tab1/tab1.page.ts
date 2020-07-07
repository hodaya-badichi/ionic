import { Component } from '@angular/core';
import { Driver } from '../driver';
import { ActionSheetController, AlertController } from '@ionic/angular';
//import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
 
   

  constructor(public alertController: AlertController) {
  
  
  
  }
  async add() {

  
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
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
}  

