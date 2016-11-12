import { Component } from '@angular/core';
import { Clients } from '../../providers/clients';
import { AgingReportsProvider } from '../../providers/agingReports';

import { NavController, ModalController, NavParams } from 'ionic-angular';
import { JobsModel } from './jobs.model';
import { ContractItem } from './jobItem.component';

@Component({
  selector: 'aging-reports',
  templateUrl: 'aging-reports.html',
  //Styles but i will be stylesUrl jlkjkljkljl
  styles: [`.agingReportListName { font-weight: normal; color: #1e1e1e; font-size: 19pt;}
      .agingReportStatus { color: #a5ff3f; font-size: 14pt;}  
  `]
})
//Aging report class 
export class AgingReports {
   reports: any;
   client: {}; 
   job: {};
   clientObject: any;
   //The constructor has the services we need to navigate between pages and pass parameters
   constructor(public nav: NavController, public agingReports: AgingReportsProvider ,public clientService: Clients, public modalCtrl: ModalController) {
    
  }
  
  //First action to be called when the pages is loaded
  ionViewDidLoad(){
    this.agingReports.getAgingReportList().then((data) => {
      this.reports = data;
      console.log(data);
    });
  }


  
}
