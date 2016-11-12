var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//model and schema of the closingRatio collection
//It guarantees the structure and definition of the collection

var closingRatioSchema = new Schema({
        _idCustomer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Client'
        },
        status: String,
    },{
        timestamps: true
    });

    var ClosingRatioModel = mongoose.model('ClosingRatio', closingRatioSchema);

    module.exports = ClosingRatioModel;


