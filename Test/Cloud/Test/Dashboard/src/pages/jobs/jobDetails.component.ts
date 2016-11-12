import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, ModalController, NavParams,ToastController, ActionSheetController } from 'ionic-angular';
import { Jobs } from '../../providers/jobs';
import { DidNotBuyExplained } from './didNotBuyExplained.component';
import { JobsList } from './jobs';
import {CallNumber, SMS} from 'ionic-native';
import { TextCustomer } from '../../modules/text.module';
import { CallCustomer } from '../../modules/call.module';
import { ShowActionSheet } from '../../modules/actionSheet.module';
import  _ from 'lodash';


@Component({
  selector: 'job-details',
  templateUrl: 'jobDetails.component.html',
  //styleUrls: ['./src/pages/jobs/jobDetails.component.scss']
   styles: ['.jobDetails { font-weight: normal; color: #353535; font-size: 15pt;}']
})

//Export class to list the info of the pipeline
export class JobDetails{
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
  //Var of the sttaus, and notes dfdf
  //noteStatus: any;hhhh
  showInProgressNotes: boolean;
  showSoldNotes: boolean;
  constructor(public nav: NavController, public jobService: Jobs, public navParam: NavParams,public modalCtrl: ModalController,public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
    
        // Getting the values passed by the caller component. 
        this._id = this.navParam.get('_id'),
        this.firstName = this.navParam.get('firstName'),
        this.lastName = this.navParam.get('lastName'),
        this.phoneNumber = this.navParam.get('phoneNumber'),
        this.street = this.navParam.get('street'),
        this.city = this.navParam.get('city'),
        this.state = this.navParam.get('state'),
        this.zipCode = this.navParam.get('zipCode'),
        this.createdAt = this.formatDate(this.navParam.get('createdAt')),
        this.sector = this.navParam.get('sector'),
        this.jobType = this.navParam.get('jobType'),
        this.note = this.navParam.get('note'),
        this.currentStatus = this.navParam.get('currentStatus'),
        this.source = this.navParam.get('source')
        
  }

  //Formats the date from the database
  formatDate(rawDate){
    var date = new Date(rawDate);  // dateStr you get from mongo
    var d = date.getDate();
    var m = date.getMonth()+1;
    let y = date.getFullYear();
    return m + "/" + d + "/" + y;
  }


  //If the user changes the status or hits the select box with the status,
  //the modal to pick the "did not buy" reason is pushed on to the top of the caller class or page 
  statusWasSelected(){
      //Creates the modal
        let modal = this.modalCtrl.create(DidNotBuyExplained);
        //when modal is closed
        modal.onDidDismiss(reasonSelected => {
          console.log(reasonSelected);
          // is a reason is selected, store it in the DB. 
          if(reasonSelected){
            let statusInfo = {
              _id: this._id,
              status: this.currentStatus,
              statusNote: reasonSelected.reason
            }
            this.jobService.updatePipelineStatus(statusInfo);
            this.note = reasonSelected.reason;
            const toast = this.toastCtrl.create({
              message: 'Your changes were successfully saved',
              showCloseButton: true,
              closeButtonText: 'Ok',
              duration: 3000
            });
            toast.present();
          }
        });
        modal.present();
        //Informs the user about the changes
        //I still need to get the response from teh server if it was saved successfully or there was any error
  }

  //When the user selects sold or in progress a form is displayed. Then the app displays a form 
  saveStatus(){
    let statusInfo = {
              _id: this._id,
              status: this.currentStatus,
              statusNote: this.note
            }
    this.jobService.updatePipelineStatus(statusInfo);
    const toast = this.toastCtrl.create({
      message: 'Your changes were successfully saved',
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    toast.present();
  }


//Shows the presentation sheet to call the customer 
    presentActionSheet(phoneNumber: string, byPassApp: boolean, message: string) {
      this.actionSheet = new ShowActionSheet(phoneNumber,byPassApp,message);
      let actionSheet = this.actionSheetCtrl.create(this.actionSheet.createActionSheet());
      actionSheet.present();
      return null;
  }

  showNotes(status){
      if(status === "sold"){
        this.showSoldNotes = true;
        this.showInProgressNotes = false;
        this.currentStatus ="Sold"
      }else if(status === "inProgress"){
        this.showSoldNotes = false;
        this.showInProgressNotes = true;
        this.currentStatus ="In progress"
      }else if(status === "Didnt buy"){
        this.showSoldNotes = false;
        this.showInProgressNotes = false;
        this.currentStatus = "Didn't buy"
        this.statusWasSelected();
      }
  }


}

