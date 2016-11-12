import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, private loadingCtrl: LoadingController) {
 
  }

  ionViewDidLoad() {
    console.log('Hello SignUp Page');
  }

  signUp(email: string, password: string):void{
    let details: UserDetails = {'email': email, 'password': password};

    this.auth.signup(details).then(() => {
      // `this.user` is now registered
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          alert('Signed in!!!');
        }
      }
    });
    return;
 }

}
