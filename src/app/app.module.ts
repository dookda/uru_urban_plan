import { PlacePageModule } from './../pages/place/place.module';
import { DescPageModule } from './../pages/desc/desc.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPageModule } from '../pages/contact/contact.module';
import { DataProvider } from '../providers/data/data';
import { HttpClientModule } from '@angular/common/http';
import { CommentPageModule } from '../pages/comment/comment.module';
import { AdditionPageModule } from '../pages/addition/addition.module';
import { FormsModule } from '@angular/forms';
import { ReplyPageModule } from '../pages/reply/reply.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    DescPageModule,
    ContactPageModule,
    CommentPageModule,
    AdditionPageModule,
    PlacePageModule,
    ReplyPageModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    Geolocation
  ]
})
export class AppModule { }
