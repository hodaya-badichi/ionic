import { Component,OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  addressFormGroup: FormGroup;
 
  ngOnInit(): void {
    this.addressFormGroup = new FormGroup({
      address: new FormControl(),
    });
 
    this.addressFormGroup.get('address').valueChanges.subscribe(value => console.log('value changed', value))
  }
}
