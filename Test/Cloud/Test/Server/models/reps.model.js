var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//model and schema of the reps collection
//It guarantees the structure and definition of the collection

var dishSchema = new Schema({
    firtsName:{
        type: String,
        required: true,
        unique: true
    },

    middleName:{
        type: String,
        required: true,
        unique: true
    },
    lastName:{
        type: String,
        required: true,
        unique: true
    }, 
    phoneNumbers:{
        number:{type: number, required: true, unique: true},
        carrier:{type: String, required: false, unique: false},
        countryCode:{type: number, required: false, unique: false},
        areaCode:{type: number, required: false, unique: false},
    },
    
    Addresses:{
        address:{type: String, required: true, unique: true},
        apt:{type: String, required: false, unique: false},
        countryCode:{type: String, required: false, unique: false},
        City:{type: String, required: false, unique: false},
        State:{type: String, required: false, unique: false},
        Country:{type: String, required: false, unique: false},
    },
    
    });

    var Reps = mongoose.model('Rep', dishSchema);

    module.exports = Reps;