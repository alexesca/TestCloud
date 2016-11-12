var mongoose = require('mongoose');
//var Clients = require('./clients.model.js');
var Schema = mongoose.Schema;

//model and schema of the agingReports table
//Will change
var agingReportsSchema = new Schema({
    _idCustomer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    _idSalesRep:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    _idCurrentSubContractor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    generatedBy : { type: String, required: false, unique: false },
    sector : { type: String, required: false, unique: false },
    jobType:{ type: String, required: false, unique: false },
    currentStatus:{type: String, required: false, unique: false},
    currentStatusNote:{type: String, required: false, unique: false},
    CurrentStatusNoteDate:{ type: Date, default: Date.now },
    contractAmount:{ type: String, required: false, unique: false },
    amountLastPaymentReceived: { type: String, required: false, unique: false },
    lastTypePaymentReceived: { type: String, required: false, unique: false },
    lastDatePaymentDeposited: { type: String, required: false, unique: false },
    totalAmountPaid: { type: String, required: false, unique: false },
    lastAmountPaidToSubContractor: { type: String, required: false, unique: false },
    lastDatePaidToSubContractor: { type: String, required: false, unique: false },
    owed: { type: String, required: false, unique: false },
    subContractors:[{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        },
        amountPaid: [{
            amount: { type: String, required: false, unique: false },
            date: { type: String, required: false, unique: false }
        }],
    }],
      suplementChangeOrder: [{
            amount: { type: String, required: false, unique: false },
            description: { type: String, required: false, unique: false },
            date: { type: String, required: false, unique: false }
          }],
      paymentsReceived:[{
          _idPaidBy: { type: String, required: false, unique: false },
          amount: { type: String, required: false, unique: false },
          type: { type: String, required: false, unique: false },
          dateDeposited: { type: String, required: false, unique: false }
      }],
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
    workNotesHistory:[{ 
        note : {type: String, required: false, unique: false},
        date : { type: Date, default: Date.now },
    }],
    statusNotesHistory:[{
        status:{type: String, required: false, unique: false},
        notes:{type: String, required: false, unique: false},
        modifiedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        }
    }],
    lastModifiedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }, 
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

    var AgingReportsModel = mongoose.model('contract', agingReportsSchema);

    module.exports = AgingReportsModel;


