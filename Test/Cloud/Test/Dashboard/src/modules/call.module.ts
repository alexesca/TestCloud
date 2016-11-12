import {CallNumber, SMS} from 'ionic-native';

export class CallCustomer{//dsadsads
    constructor(number:string, byPassAPI: boolean){
        CallNumber.callNumber(number, byPassAPI)
        .then(() => console.log('Launched dialer!'))
        .catch((err) => console.log('Error launching dialer',err));
        console.log('Archive clicked');
    }
}