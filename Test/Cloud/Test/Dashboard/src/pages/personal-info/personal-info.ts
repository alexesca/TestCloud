import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PersonalInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html'
})
export class PersonalInfoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PersonalInfo Page');
  }

}
