import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Jobs {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
  //Makes the request to the API/REST server
    getJobsList(){
 
    /*if (this.data) {
      return Promise.resolve(this.data);
    }*/
 
    return new Promise(resolve => {
      //Calls this url and return a parsed json.object hjhkjhkjhkjh
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/pipeline')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

   //Makes the request to the API/REST server
    getOneJob(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      //Calls this url and return a parsed json.object
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/pipeline/one')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  //Makes the request to the API/REST server 
  insertJob(job){
    //Solves CROSS errors
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //Calls this url and return a parsed json.object
    this.http.post('https://server-dynamic-port-dashboard.herokuapp.com/api/pipeline', JSON.stringify(job), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }

  //Makes the request to the API/REST server
  updatePipelineStatus(statusInfo){
    let headers = new Headers();
    let response;
    headers.append('Content-Type', 'application/json');
    //Calls this url and return a parsed json.object
    return this.http.post('https://server-dynamic-port-dashboard.herokuapp.com/api/pipeline/updateStatus', JSON.stringify(statusInfo), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }



}