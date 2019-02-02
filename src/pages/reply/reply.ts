import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reply',
  templateUrl: 'reply.html',
})
export class ReplyPage {
  public comment: any;
  public gid: any;
  public txt: any;
  public reply: Reply;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    const data = this.navParams.get('data');
    this.gid = data.gid;
    this.comment = data.ucomment;
    console.log(data);
  }

  sendReply() {
    if (this.txt) {
      this.reply = {
        gid: this.gid,
        answer: this.txt
      }

      console.log(this.reply)
      this.dataProvider.addCommentReply(this.reply).then((res: any) => {
        // console.log(res);
        this.closeModal('yes');
      })
    }
  }

  closeModal(e: any) {
    this.viewCtrl.dismiss(e);
  }

}

export interface Reply {
  gid?: number;
  answer?: any;
}