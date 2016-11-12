
import { Component } from '@angular/core';
import { Clients } from '../../providers/clients';
import { ClosingRatioProvider } from '../../providers/closingRatio';
import { NavController, ModalController, NavParams } from 'ionic-angular';

@Component({
  selector: 'closing-ratio',
  templateUrl: 'closing-ratio.html',
  styles: [`.colStatus {text-align: left; color: #000519; background-color: #f49842; font-weight: bold; font-size: 9pt;}
      .colQuarter { text-align: center; color: #000519; background-color: #f2e31a; font-weight: bold; font-size: 12pt}  
      .colValues {text-align: center;  background-color: #f2f0e3}
  `],
})
//Job closing ratio jjkljkll
export class ClosingRatio {
   reports: any;
   agingReportInfo: {};
   client: {}; 
   job: {};
   clientObject: any;
   year: number;
   matrix:[{}];
   matrixCompany:[{}];
   objTotal: {};
   objTotalCompany: {};
  //The constructor has the services we need to navigate between pages and pass parameters
  constructor(public nav: NavController, public closingRatioProvider: ClosingRatioProvider ,public clientService: Clients, public modalCtrl: ModalController) {
    this.year = new Date().getFullYear();
  }
  
  closingRatioSalesRepByYear(){
    console.log("change", this.year);
    //Calls the funciton that calculate sthe closing ratio
    this.closingRatioProvider.getClosingRatioSalesRep(this.year, "5807a86bf8d0c52d78d5140d").then((data) => {
      this.matrix = data;
      var totalSold: number = 0;
      var totalDidNotBuy:number = 0;
      var totalInProgress:number = 0;
      var count: number = 0;
      this.matrix.forEach(element => {
        totalSold += element.sold.count;
        totalDidNotBuy += element.didNotBuy.count;
        totalInProgress += element.inProgress.count;
      });
      this.objTotal = new Object({
        sold : {count: totalSold} ,
        didNotBuy: {count: totalDidNotBuy},
        inProgress:{count: totalInProgress},
        totalLeads:{count: totalSold + totalDidNotBuy + totalInProgress},
        closingRatio:{count: totalSold/(totalSold + totalDidNotBuy)}
      });
      this.matrix.forEach(element => {
        element.totalLeads.count = element.sold.count + element.didNotBuy.count + element.inProgress.count;
        element.closingRatio.count = element.sold.count / (element.sold.count + element.didNotBuy.count );
      });
      this.matrix.push(this.objTotal);
      console.log(this.matrix);
    });
  }

  closingRatioCompanyByYear(){
    //Calls the funciton that calculate sthe closing ratio  fdsfsdfsdfds
    this.closingRatioProvider.getClosingRatioCompany(this.year).then((data) => {
      this.matrixCompany = data;
      var totalSold: number = 0;
      var totalDidNotBuy:number = 0;
      var totalInProgress:number = 0;
      var count: number = 0;
      this.matrixCompany.forEach(element => {
        totalSold += element.sold.count;
        totalDidNotBuy += element.didNotBuy.count;
        totalInProgress += element.inProgress.count;
      });
      this.objTotalCompany = new Object({
        sold : {count: totalSold} ,
        didNotBuy: {count: totalDidNotBuy},
        inProgress:{count: totalInProgress},
        totalLeads:{count: totalSold + totalDidNotBuy + totalInProgress},
        closingRatio:{count: totalSold/(totalSold + totalDidNotBuy)}
      });
      this.matrixCompany.forEach(element => {
        element.totalLeads.count = element.sold.count + element.didNotBuy.count + element.inProgress.count;
        element.closingRatio.count = element.sold.count / (element.sold.count + element.didNotBuy.count );
      });
      this.matrixCompany.push(this.objTotalCompany);
    });
  }
  
  //First action to be called when the pages is loaded 
  ionViewDidLoad(){
    this.closingRatioSalesRepByYear();
    this.closingRatioCompanyByYear(); 
}

  calculateClosingRatio(){
    this.closingRatioSalesRepByYear();
    this.closingRatioCompanyByYear();
  }

}

