import { Component } from '@angular/core';
import { Clients } from '../../providers/clients';
import { Jobs } from '../../providers/jobs';
import { JobsModel } from './jobs.model';
import { JobItem } from './jobItem.component';
import { NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
import  _ from 'lodash';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
  styles: [`.jobListName { font-weight: normal; color: #1e1e1e; font-size: 19pt;}
      .jobStatus { color: #a5ff3f; font-size: 14pt;}  
  `],
  entryComponents:[ JobItem ],
})
//Job list class fgfdgfdg
export class JobsList {
   public jobs: JobsModel[];
   jobsSortedByName: JobsModel[];
   job: {};
   clientObject: any;

   //if sort was clicked
   sort: number = 0;

   //The constructor has the services we need to navigate between pages and pass parameters
  constructor(public nav: NavController, public jobService: Jobs, public viewCtrl: ViewController) {
    
  }
    //First action to be called when the pages is loaded dasdsdas
  ionViewDidLoad(){
    this.updateContent();
  }

  ionViewDidEnter(){
    this.updateContent();
  }

  updateContent(){
    //gets the list of all the leads
    this.jobService.getJobsList().then((data) => {
      this.jobs = data;
      console.log(data)
    });
  }



    formatDate(rawDate){
      var date = new Date(rawDate);  // dateStr you get from mongodbdsadasdsad
      var d = date.getDate();
      var m = date.getMonth()+1;
      let y = date.getFullYear();
      return m + "/" + d + "/" + y;
    }

    //Sorting pipeline by name jkllkjlk
    sortPipelineByName(){
      switch (this.sort) {
        case 0:
            this.jobs = _.sortBy(this.jobs, [function(o) { return o._idPeople.firstName; }]);
            this.sort++;  
          break;
        case 1:
            this.jobs = _.sortBy(this.jobs, [function(o) {
            var date = new Date(o.createdAt);  // dateStr you get from
            var d = date.getDate();
            var m = date.getMonth()+1;
            let y = date.getFullYear();
            console.log(new Date(m + "/" + d + "/" + y)); 
              return new Date(m + "/" + d + "/" + y);
            }]);
            this.sort++;
          break;
        case 2:
            this.jobs = _.sortBy(this.jobs, [function(o) { return o._idPeople.lastName; }]);
            this.sort++;  
          break;
        default:
            this.sort = 0;
          break;
      }
    }

    statusWasChanged(message: string){
      console.log("event emitted", message );
    }
}
