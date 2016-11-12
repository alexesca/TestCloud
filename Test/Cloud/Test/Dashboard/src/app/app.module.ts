import { NgModule } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';
import { JobsList } from '../pages/jobs/jobs';
import { JobDetails } from '../pages/jobs/jobDetails.component';
import { DidNotBuyExplained } from '../pages/jobs/didNotBuyExplained.component';
import { AgingReports } from '../pages/aging-reports/aging-reports';
import { AgingReportsDetails } from '../pages/aging-reports/agingReportDetails.component';
import { ClosingRatio } from '../pages/closing-ratio/closing-ratio';
import { Jobs } from '../providers/jobs';
import { Clients } from '../providers/clients';
import { AgingReportsProvider } from '../providers/agingReports';
import { ClosingRatioProvider } from '../providers/closingRatio';
import { IonicApp, IonicModule } from 'ionic-angular';
import { JobItem } from '../pages/jobs/jobItem.component';
import { ContractItem } from '../pages/aging-reports/jobItem.component';
import { AuthHttp, AuthConfig,AUTH_PROVIDERS } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import {CloudSettings, CloudModule  } from '@ionic/cloud-angular';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
//Using cloud settings

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7dd3b493'
  }
};




//Includes all the provider and componenets needed to render the application
@NgModule({
  //Add your component here
  declarations: [
    TabsPage,
    JobsList,
    JobDetails,
    DidNotBuyExplained,
    AgingReports,
    AgingReportsDetails,
    ClosingRatio,
    JobItem,
    ContractItem,
    MyApp,
    LoginPage,
    SignUpPage,
    PersonalInfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  //Add that same component here again hkhkjhk
  entryComponents: [
    TabsPage,
    JobsList,
    JobDetails,
    DidNotBuyExplained,
    AgingReports,
    AgingReportsDetails,
    ClosingRatio,
    JobItem,
    ContractItem,
    MyApp,
    LoginPage,
    SignUpPage,
    PersonalInfoPage
  ],
  //Add your providers or services here
  providers: [Jobs, Clients, AgingReportsProvider, ClosingRatioProvider]
})
export class AppModule {}