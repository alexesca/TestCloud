import { Component, Input } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { JobsModel } from './jobs.model';
import { AgingReportsDetails } from './agingReportDetails.component';
import {CallNumber, SMS} from 'ionic-native';
import {CallCustomer} from '../../modules/call.module';
import {TextCustomer} from '../../modules/text.module';


@Component({
  selector: 'contract-item',
  templateUrl: 'jobItem.component.html',
  entryComponents:[ AgingReportsDetails ]
})

//Class did not buy explained dasdsadsad
export class ContractItem {

    reason: any;
    agingReportInfo: {};
    callPhoneNumber: CallCustomer;
    textPhoneNumber: TextCustomer;
    @Input() jobItemObject: JobsModel;
    //constructor
    constructor(public viewController: ViewController, public nav: NavController){     
        
    }

    //This component pushes or calls another componennt when the user taps on the link or button
  //This is what makes the navigation happen
    pushagingReportDetails(agingReport) {
      //Creating an object to be passed as a parameter
      this.agingReportInfo = {
        _id: agingReport._id,
        firstName: agingReport._idCustomer.firstName,
        middleName :  agingReport._idCustomer.lastName,
        lastName : agingReport._idCustomer.middleName,
        phoneNumber: agingReport._idCustomer.primaryPhoneNumber.number,
        street: agingReport.address.street,
        zipCode: agingReport.address.zipCode,
        city: agingReport.address.city,
        state: agingReport.address.state,
        createdAt: agingReport.createdAt,
        currentStatus: agingReport.currentStatus,
        jobType: agingReport.jobType,
        source: agingReport.marketing.source,
        sector: agingReport.sector,
        note: agingReport.currentStatusNote,
        salesRepName : agingReport._idSalesRep.firstName,
        contractorName : agingReport._idCurrentSubContractor.firstName,
        contractAmount : agingReport.contractAmount,
        owed : agingReport.owed,
        totalAmountReceived : agingReport.totalAmountPaid
      }
      //Pushing the new component or page in top of the caller page. 
      this.nav.push(AgingReportsDetails,this.agingReportInfo);
    } 

    callCustomer(phoneNumber: string, byPassAPI: boolean){
        this.callPhoneNumber = new  CallCustomer(phoneNumber, byPassAPI);
        console.log(423432);
    } 

    textCustomer(phoneNumber: string, message?: string){
        this.textPhoneNumber = new  TextCustomer(phoneNumber, message);
        console.log(423432);
    }  
}