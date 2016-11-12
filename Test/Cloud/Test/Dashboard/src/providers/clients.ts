import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Clients {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }

  
  //Makes the request to the API/REST server
 
  insertClient(client){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     //Calls this url and return a parsed json.object
    this.http.post('http://localhost:8080/api/clients', JSON.stringify(client), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }


  //Makes the request to the API/REST server
    getOneClient(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
       //Calls this url and return a parsed json.object
      this.http.get('https://server-dynamic-port-dashboard.herokuapp.com/api/clients/one')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

}