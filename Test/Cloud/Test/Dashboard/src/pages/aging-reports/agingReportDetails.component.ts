import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,ToastController, ActionSheetController  } from 'ionic-angular';
import { Jobs } from '../../providers/jobs';
import { ShowActionSheet } from '../../modules/actionSheet.module';
@Component({
  selector: 'aging-reports-details',
  templateUrl: 'agingReportDetails.component.html',
  //styleUrls: ['./src/pages/jobs/jobDetails.component.scss'] 
   styles: ['.jobDetails { font-weight: normal; color: #353535; font-size: 15pt;}']
})

//Export class to list the info of the aging reports uiuouiou
export class AgingReportsDetails {
  //Contract and Customer info
  _id : String;
  firstName : String;
  lastName : String;
  phoneNumber : String;
  street : String;
  city : String;
  state : String;
  zipCode : String;
  createdAt : String;
  sector : String;
  jobType : String;
  note : String;
  source: String;
  currentStatus: String;
  didNotBuyReasons: String[];

  actionSheet: ShowActionSheet;
  //Sales rep info
  salesRepName: String;

  //Contractor info hkjhjkhjk
  contractorName: String;
  contractAmount: String;
  owed: String;
  totalAmountReceived: String;

  //Var of the staus, and notes 
  //noteStatus: any;
   //The constructor has the services we need to navigate between pages and pass parameters

  constructor(public nav: NavController, public jobService: Jobs, public navParam: NavParams,public modalCtrl: ModalController,public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
      
        this._id = this.navParam.get('_id');
        this.firstName = this.navParam.get('firstName');
        this.lastName = this.navParam.get('lastName');
        this.phoneNumber = this.navParam.get('phoneNumber');
        this.street = this.navParam.get('street');
        this.city = this.navParam.get('city');
        this.state = this.navParam.get('state');
        this.zipCode = this.navParam.get('zipCode');
        this.createdAt = this.formatDate(this.navParam.get('createdAt'));
        this.sector = this.navParam.get('sector');
        this.jobType = this.navParam.get('jobType');
        this.note = this.navParam.get('note');
        this.currentStatus = this.navParam.get('currentStatus');
        this.source = this.navParam.get('source');
        this.salesRepName = this.navParam.get('salesRepName');
        this.contractorName = this.navParam.get('contractorName');
        this.contractAmount = this.navParam.get('contractAmount');
        this.owed = this.navParam.get('owed');
        this.totalAmountReceived = this.navParam.get('totalAmountReceived');
  }

  //Formats the date from the database
  formatDate(rawDate){
    var date = new Date(rawDate); 
    var d = date.getDate();
    var m = date.getMonth()+1;
    let y = date.getFullYear();
    return m + "/" + d + "/" + y;
  }


  //Shows the presentation sheet to call the customer
    presentActionSheet(phoneNumber: string, byPassApp: boolean, message: string) {
      this.actionSheet = new ShowActionSheet(phoneNumber,byPassApp,message);
      let actionSheet = this.actionSheetCtrl.create(this.actionSheet.createActionSheet());
      actionSheet.present();
      return null;
  }


}

