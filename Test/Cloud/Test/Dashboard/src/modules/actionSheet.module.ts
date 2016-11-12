import { ActionSheetController } from 'ionic-angular'
import {CallCustomer} from '../modules/call.module';
import {TextCustomer} from '../modules/text.module';
//Shows the presentation sheet to call the customer
export class ShowActionSheet{
    
    //variables to instantiate module
    callCustomer : CallCustomer;
    textCustomer : TextCustomer;

    //variables to call customer
    objectActionSheet: any;
    phoneNumber: string;
    byPassApp: boolean;
    message:string = '';

    constructor(phoneNumber: string, byPassApp: boolean, message?:string){
        this.phoneNumber = phoneNumber;
        this.byPassApp = byPassApp;
        this.message = message;
    }

    createActionSheet() {
        
        this.objectActionSheet ={
            title: 'Contact',
            buttons: [
                {
                    text: 'Call',
                    handler: () => {
                        this.callCustomer = new CallCustomer(this.phoneNumber,this.byPassApp);
                }
                },{
                    text: 'Text',
                    handler: () => {
                        this.textCustomer = new TextCustomer(this.phoneNumber,this.message);
                }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
              }
            ]
        }
    return this.objectActionSheet;
  }
  
}