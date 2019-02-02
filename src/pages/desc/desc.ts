import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { AdditionPage } from '../addition/addition';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-desc',
  templateUrl: 'desc.html',
})
export class DescPage {
  public code: string;
  public lat: number;
  public lng: number;
  public list: any;
  public no: any;
  public rmk: any;
  public type: any;
  public area: any;

  public feature: DataReport;
  public ucomment: string;
  public uname: string;
  public uphone: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    const fs = this.navParams.get('feature');
    this.code = fs.code;
    this.lat = fs.lat;
    this.lng = fs.lng;
    this.list = fs.list;
    this.no = fs.no;
    this.type = fs.type;
    this.rmk = fs.rmk;
    this.area = fs.area;
    // console.log(fs);
  }

  closeModal() {
    this.viewCtrl.dismiss();
    console.log('close')
  }

  gotoComment() {
    const modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

  gotoAddition() {
    const modal = this.modalCtrl.create(AdditionPage);
    modal.present();
  }

  addUrbanComment() {
    if (!this.ucomment) {
      console.log('กรุณาแสดงความคิดเห็น')
    } else if (!this.uphone) {
      console.log('กรุณากรอกหมายเลขโทรศัพท์')
    } else {
      this.feature = {
        code: this.code,
        lat: this.lat,
        lng: this.lng,
        no: this.no,
        ucomment: this.ucomment,
        uphone: this.uphone,
        uname: this.uname,
      }

      this.dataProvider.addUrbanComment(this.feature).then((res) => {
        console.log(res);
        this.closeModal()
      });
    }

  }

}

export interface FeatureObj {
  list?: string;
  no?: number;
  rmk?: string;
  area?: number;
}

export interface DataReport {
  code?: string;
  lat?: number;
  lng?: number;
  list?: string;
  no?: number;
  rmk?: string;
  ucomment?: string;
  uphone?: string;
  uname?: string;
}
