import {SMS} from 'ionic-native';

export class TextCustomer{
    constructor(number:string, message: string){
        SMS.send('416123456', message);
            console.log('Archive clicked');
    }
}