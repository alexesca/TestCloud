var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//model and schema of the clients collection
//It guarantees the structure and definition of the collection
var clientsSchema = new Schema({
    firstName:{ type: String, required: false, unique: false },
    middleName:{ type: String, required: false, unique: false },
    lastName:{ type: String, required: false, unique: false },
    gender:{ type: String, required: false, unique: false },
    race:{ type: String, required: false, unique: false },
    primaryPhoneNumber: {
          number:{ type: Number, required: false, unique: false },
          carrier: { type: String, required: false, unique: false },
          countryCode: { type: String, required: false, unique: false },
          areaCode: { type: String, required: false, unique: false }
      }, 
    otherPhoneNumbers: [{
          number:{ type: Number, required: false, unique: false },
          carrier: { type: String, required: false, unique: false },
          countryCode: { type: String, required: false, unique: false },
          areaCode: { type: String, required: false, unique: false }
    }],
    primaryAddresse:{
          address: { type: String, required: false, unique: false },
          apt: { type: String, required: false, unique: false },
          Zip: { type: String, required: false, unique: false },
          City: { type: String, required: false, unique: false },
          State: { type: String, required: false, unique: false },
          Country: { type: String, required: false, unique: false }
      },
    otherAddresses:[{
          address: { type: String, required: false, unique: false },
          apt: { type: String, required: false, unique: false },
          Zip: { type: String, required: false, unique: false },
          City: { type: String, required: false, unique: false },
          State: { type: String, required: false, unique: false },
          Country: { type: String, required: false, unique: false }
    }],
    primaryEmailAddress: { type: String, required: false, unique: false },
    emailAddresses:[{
        email: { type: String, required: false, unique: false }
    }],
    trade:[{ type: String, required: false, unique: false }]

});

//It should be singular because mongoose makes it plural
var Clients = mongoose.model('Client', clientsSchema);

module.exports = Clients;