import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  public places: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlacePage');
    this.loadPlace()
  }

  loadPlace() {
    this.dataProvider.getPlace().then((res: any) => {
      this.places = res.data;
    })
  }

  placeSelected(e: any) {
    this.viewCtrl.dismiss(e);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


}
