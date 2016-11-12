import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { JobDetailsInterface } from './JobDetails.interface';

@Component({
  selector: 'didNotBuyExplained',
  templateUrl: 'didNotBuyExplained.component.html',
  styles: ['.headerStyle{font-weight: bold; background-color: #cecece; text-align: left;}']
})
//Class did not buy explained  jdasjdklasjdklsd
export class DidNotBuyExplained {
     //Array contains all the options of did not buy
     didNotBuyReasons = [
              "Called but never called back",
              "Canceled contract",
              "Deductible",
              "Didn't file claim",
              "Freebie",
              "Fixed themselves",
              "Gave estimate but never called back",
              "Not going to fix",
              "Price",
              "Sales rep",
              "Used another company",
              "Used us for realtor closing",
        ];

        noOpportunityReasons=[
            "No money",
            "Not our scope of work",
            "Financing denied",
            "Canceled appointment",
            "Not the property owner",
            "Claim denied",
            "Sold house",
            "Racism issue",
            "Not a good job"
        ]


        reason: any;
        //constructor
        constructor(public viewController: ViewController){     
    }

    //function called when th users hits done without selecting any of the reasons
        closeDidNotBuyExplainedModal(){
            this.viewController.dismiss();
        }
    
    //The user selected one reaosn, the tabs is closed automatically and the operation is stored in the database. 
        selectedDidNotBuyExplainedReason(option){
            let reasonSelected= {
                reason: option 
            } 
            this.viewController.dismiss(reasonSelected);
        }
        
}