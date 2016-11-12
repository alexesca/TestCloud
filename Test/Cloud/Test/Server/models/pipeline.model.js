var mongoose = require('mongoose');
//var Clients = require('./clients.model.js');
var Schema = mongoose.Schema;

//model and schema of the pipeline collection
//It guarantees the structure and definition of the collection

var pipelineSchema = new Schema({
    _idPeople:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    sector : { type: String, required: false, unique: false },
    marketing : {
        source:{type: String, required: false, unique: false},
        extraSource : {
            _id :{type: String, required: false, unique: false},
        },
    },
    address:{
        street:{type: String, required: false, unique: false},
        apt:{type: String, required: false, unique: false},
        zipCode:{type: String, required: false, unique: false},
        city:{type: String, required: false, unique: false},
        state:{type: String, required: false, unique: false},
        country:{type: String, required: false, unique: false},
    }, 
    //lastNote: {type: String, required: false, unique: false},
    //dateLastNote: { type: Date, default: Date.now },
    notesHistory:[{ 
        note : {type: String, required: false, unique: false},
        date : { type: Date, default: Date.now },
    }],
    jobType:{ type: String, required: false, unique: false },
    currentStatus:{type: String, required: false, unique: false},
    currentStatusNote:{type: String, required: false, unique: false},
    dateCurrentNoteStatus:{ type: Date, default: Date.now },
    lastModifiedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }, 
    statusHistory:[{
        status:{type: String, required: false, unique: false},
        notes:{type: String, required: false, unique: false},
        modifiedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        }
    }],
    currentAssignedTo: {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        },
        date: { type: Date, default: Date.now },
    },
    assignedToHistory:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        },
        date: { type: Date, default: Date.now },
    }],
    currentAssignedBy:{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        },
        date: { type: Date, default: Date.now },
    },
    assignedByHistory:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        },
        date: { type: Date, default: Date.now },
    }]
    },{
        timestamps: true
    });

    var Pipeline = mongoose.model('pipeline', pipelineSchema);

    module.exports = Pipeline;




    /*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    _id : { type: String, required: false, unique: false },
    _idPeople:{ type: String, required: false, unique: false },
    addresses:[{
        address:{type: String, required: false, unique: false},
        apt:{type: String, required: false, unique: false},
        countryCode:{type: String, required: false, unique: false},
        City:{type: String, required: false, unique: false},
        State:{type: String, required: false, unique: false},
        Country:{type: String, required: false, unique: false},
    }],
    emailAddresses:{
        email : {type: String, required: false, unique: false},
    },
    date : { type: Date, required: false, unique: false }, 
    sector : { type: String, required: false, unique: false },
    marketing : [{
        source:{type: String, required: false, unique: false},
        extraSource : {
            _id :{type: String, required: false, unique: false},
            name :{type: String, required: false, unique: false},
        },
    }],
    notes:[{ 
        note : {type: String, required: false, unique: false},
        date : {type: Date, required: false, unique: false},
    }],
    jobType:{ type: String, required: false, unique: false },
    status:[{
        status:{type: String, required: false, unique: false},
        notes:{type: String, required: false, unique: false},
    }],
    assignedTo:[{
        _id:{type: String, required: false, unique: false},
        firstName:{type: String, required: false, unique: false},
        lastName:{type: String, required: false, unique: false},
        phone:{type: String, required: false, unique: false},
        date:{type: String, required: false, unique: false},
    }],
    assignedBy:[{
        _id:{type: String, required: false, unique: false},
        firstName:{type: String, required: false, unique: false},
        lastName:{type: String, required: false, unique: false},
        phone:{type: String, required: false, unique: false},
        date:{type: Date, required: false, unique: false},
    }],
    });

    var Jobs = mongoose.model('Job', dishSchema);

    module.exports = Jobs; */