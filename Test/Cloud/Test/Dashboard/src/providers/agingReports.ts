import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AgingReportsProvider {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  //Makes the request to the API/REST server
    getAgingReportList(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/agingReports')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
}