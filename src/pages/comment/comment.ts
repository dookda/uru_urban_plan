import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { ReplyPage } from '../reply/reply';


@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  public comment: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataProvider: DataProvider,
    public modalCtrl: ModalController

  ) {
  }

  ionViewDidLoad() {
    console.log('dasda')
    this.loadData();
  }

  loadData() {
    this.dataProvider.getComment().then((res: any) => {
      this.comment = res.data;
      console.log(res.data);
    })
  }

  gotoReply(data: any) {
    const modal = this.modalCtrl.create(ReplyPage, { data: data });
    modal.onDidDismiss((res: any) => {
      // console.log(res)
      if (res == 'yes') this.loadData();
    })
    modal.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
    // console.log('close')
  }

}
