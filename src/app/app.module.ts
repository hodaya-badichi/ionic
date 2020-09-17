import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
 import{EmailComposer}from '@ionic-native/email-composer/ngx';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
 

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule, 
     HttpClientModule,
    // AgmCoreModule.forRoot({    
    //   apiKey: 'AIzaSyB7FXQhE0DhQRyTX6wDCM3Ix3ASCPF6LFI',
    //   libraries: ['places']
    // }),
    // MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7FXQhE0DhQRyTX6wDCM3Ix3ASCPF6LFI',
      libraries: ['places']
    }),
    AgmDirectionModule,     
  ],
  providers: [
    StatusBar,
    SplashScreen,  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailComposer,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
