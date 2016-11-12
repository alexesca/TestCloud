import { AlertController  } from 'ionic-angular';

export class ConfirmAlert{
    
   
    showConfirmAlert(alertCtrl: AlertController,title: string, message: string, cancelText: string, okText:string): boolean{
      let response: boolean = false;
      let confirm = alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: cancelText,
          handler: () => {
            response = false;
          }
        },
        {
          text: okText,
          handler: () => {
            response = true;
          }
        }
      ]
    }
    );
    confirm.present();
    }
}