import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { getMaxListeners } from 'process';
//import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
 
   

  constructor(public alertController: AlertController) {
  
  
  
  }
  getMax():number{
    return 5;
  }
  async add() {

  
    const alert = await this.alertController.create({
      header: 'הצטרף',
      message:'',
      inputs:[
        {
          name: 'number',
          type: 'number',
          min: 1,
          max:this.getMax(),
        }
      ],
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

