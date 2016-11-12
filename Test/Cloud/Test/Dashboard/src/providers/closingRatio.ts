import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 //dsadasddasdasdsad
@Injectable()
export class ClosingRatioProvider {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
  
  //Makes the request to the API/REST server 
    getClosingRatiotList(){
 
 
    return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get('http://localhost:8080/api/closingRatio')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getClosingRatioSalesRep(year, id){
    
     return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/closingRatio/totalQuarterSalesRep?year='+ year + '&id=' + id)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getClosingRatioCompany(year){
    
     return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/closingRatio/totalQuarterCompany/' + year)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

}