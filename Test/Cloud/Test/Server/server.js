// Set up
                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
//Importing Models
var Clients = require('./models/clients.model.js');
var pipeline = require('./models/pipeline.model.js');
var AgingReports = require('./models/agingReports.model.js');
var ClosingRatio = require('./models/closingRatio.model.js');

//Changing This order might affect the rendering 
var express  = require('express');
var app      = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

//JWT
//var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');
//var config = require('./config'); // get our config file

//var router = express.Router();              // get an instance of the express Router


//Connecting to mongoose 
mongoose.connect('mongodb://admin:123456789@ds149437.mlab.com:49437/dashboard');


//setting the dynamic port
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));


//app.use(expressJwt({secret: config.secret}).unless({path: ['/login']}))
//app.set('superSecret', config.secret); // secret variable
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());



//Solves CROSS errors
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Routes

 
    /*************************************************************************************
     * GETs all the leads in the pipeline collection and populates the idpeople field*****
    *************************************************************************************/
    app.get('/api/pipeline', function(req, res) {
  
        pipeline.find({"currentStatus" : "In progress"}).populate('_idPeople').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    res.json(result);   
                }
            });
    });

    /*************************************************************************************
     * GET aging reports******************************************************************
    *************************************************************************************/
    app.get('/api/agingReports', function(req, res) {
  
        AgingReports.find({}).populate('_idCustomer _idSalesRep _idCurrentSubContractor').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    res.json(result);   
                }
            });
    });

    /*************************************************************************************
     * GET closing ratio******************************************************************
     */
    app.get('/api/closingRatio', function(req, res) {
  
        ClosingRatio.find({}).populate('_idCustomer').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    console.log(result);
                    res.json(result);   
                }
            });
    });

     /*************************************************************************************
     * GETs the total number of leads per SALES REP and quarters
     *************************************************************************************/
        app.get('/api/closingRatio/totalQuarterSalesRep', function(req, res) {

        var newId = new mongoose.mongo.ObjectId(req.query.id);
        // use mongoose to get all reviews in the database
        var totalLeads = 0;
        var year = req.query.year;
        var global = {};
        var objClosingRatio = [];
        var quardersMatrix =[
            {
                startDate: new Date(year + "-01-01T00:00:00.767Z"),
                endDate: new Date(year + "-03-31T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-04-01T00:00:00.767Z"),
                endDate: new Date(year + "-06-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-07-01T00:00:00.767Z"),
                endDate: new Date(year + "-09-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-10-01T00:00:00.767Z"),
                endDate: new Date(year + "-12-31T00:00:00.767Z")
            }
        ];
        var count = 1;
        quardersMatrix.forEach(function(quarter) {
            ClosingRatio.aggregate([
                { $match: { _idCustomer: newId,createdAt: { $gte: quarter.startDate, $lte: quarter.endDate}}}
                ,{ $group : {
                    _id:{status: "$status"},
                    count: { $sum: 1 },
                }}   
        ],function(err, client) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
                    //res.json(client); // return all reviews in JSON format
                    var obj = [];
                    var templateObject ={sold: {name: "Sold", count: 0}, didNotBuy: {name: "Didn't buy", count: 0}, inProgress: {name: "In progress", count: 0}, totalLeads: {count: 0}, closingRatio: {count: 0}};
                    var countElements = 0;
                    var totalLeads = 0;
                    client.forEach(function(element) {
                        switch (element._id.status) {
                            case "Sold":
                                templateObject.sold.count = element.count;
                                break;
                            case "Didn't buy":
                                templateObject.didNotBuy.count = element.count;
                                break;
                            case "In progress":
                                templateObject.inProgress.count = element.count;
                                break;
                            default:
                                break;
                        }
                        if(countElements < 1){
                            objClosingRatio.push(templateObject);
                        }
                        countElements++;

                    }, this);
                    if(count === 4){
                        console.log(objClosingRatio);
                        res.json(objClosingRatio); 
                    }
                    count++;
                });
        }, this);
        });
 
    /*************************************************************************************
     * GETs the total number of leads per SALES REP and quarters
     *************************************************************************************/
        app.get('/api/closingRatio/totalQuarterCompany/:year', function(req, res) {

        // use mongoose to get all 
        var totalLeads = 0;
        var year = req.params.year;
        var global = {};
        var objClosingRatio = [];
        var quardersMatrix =[
            {
                startDate: new Date(year + "-01-01T00:00:00.767Z"),
                endDate: new Date(year + "-03-31T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-04-01T00:00:00.767Z"),
                endDate: new Date(year + "-06-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-07-01T00:00:00.767Z"),
                endDate: new Date(year + "-09-30T00:00:00.767Z")
            },
            {
                startDate: new Date(year + "-10-01T00:00:00.767Z"),
                endDate: new Date(year + "-12-31T00:00:00.767Z")
            }
        ];
        var count = 1;
        quardersMatrix.forEach(function(quarter) {
            ClosingRatio.aggregate([
                { $match: { createdAt: {$gte: quarter.startDate, $lte: quarter.endDate}}}
                ,{ $group : {
                    _id:{status: "$status"},
                    count: { $sum: 1 },
                }}   
        ],function(err, client) {
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
                    //res.json(client); // return all reviews in JSON format
                    var obj = [];
                    var templateObject ={sold: {name: "Sold", count: 0}, didNotBuy: {name: "Didn't buy", count: 0}, inProgress: {name: "In progress", count: 0}, totalLeads: {count: 0}, closingRatio: {count: 0}};
                    var countElements = 0;
                    var totalLeads = 0;
                    client.forEach(function(element) {
                        switch (element._id.status) {
                            case "Sold":
                                templateObject.sold.count = element.count;
                                break;
                            case "Didn't buy":
                                templateObject.didNotBuy.count = element.count;
                                break;
                            case "In progress":
                                templateObject.inProgress.count = element.count;
                                break;
                            default:
                                break;
                        }
                        if(countElements < 1){
                            objClosingRatio.push(templateObject);
                        }
                        countElements++;

                    }, this);
                    if(count === 4){
                        console.log(objClosingRatio);
                        res.json(objClosingRatio); 
                    }
                    count++;
                });
        }, this);
        });
 

   
    /*************************************************************************************
     * GETs one lead in the pipeline collection and populates the idpeople field**********
     *************************************************************************************/
    app.get('/api/pipeline/one', function(req, res) {
  
        pipeline.find({}).populate('_idPeople').exec(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    console.log(result,"consoling result");
                    res.json(result);
                    
                }
            });
    });

    /*************************************************************************************
     * GETs one client in the clients collection and populates the idpeople field*****
     *************************************************************************************/
    app.get('/api/clients/one', function(req, res) {
  
        // use mongoose to get all reviews in the database
        Clients.findOne(function(err, client) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(client); // return all reviews in JSON format
        });
    });

    /*************************************************************************************
     * Inserts a client*****
     *************************************************************************************/
    app.post('/api/clients', function(req, res) {
        // create a review, information comes from request from Ionic
        Clients.create({
            firstName: req.body.firstName,
            middleName : req.body.lastName,
            lastName :req.body.middleName,
            zipCode: req.body.zip,
            primaryPhoneNumber: {
                number: req.body.primaryPhoneNumber.number,
                carrier: req.body.primaryPhoneNumber.carrier,
                countryCode: req.body.primaryPhoneNumber.countryCode,
                areaCode: req.body.primaryPhoneNumber.areaCode,
            }, 
        }, function(err, client) {
            if (err)
                res.send(err);
 
            // get and return all the clients after you create it
            Clients.find(function(err, clients) {
                if (err)
                    res.send(err)
                res.json(clients);
            });
        });
    });

    /*************************************************************************************
     *POSTS / chnages the status of the lead *****
     *************************************************************************************/
    app.post('/api/pipeline/updateStatus', function(req, res) {
        // Update status of the pipeline
        pipeline.update({
             _id: req.body._id },
             { $set: { 
                 currentStatus: req.body.status,
                 currentStatusNote: req.body.statusNote
               },
            },function(err,pipeline){
            if(err){
                res.send(err)
            }else{
                
            }
        });
    });


    /*************************************************************************************
     *Inserts create a new lead*****
     *************************************************************************************/
    app.post('/api/pipeline', function(req, res) {
        var insert  = new pipeline({
            _idPeople: "580824ce4111e31428dabebd",
            sector: "Agrario",
            marketing:{
                source: "Realtor",
                extraSource: "5807a86bf8d0c52d78d5140d"
            },
            address:{
                street:"500 N 200 E",
                apt:"5",
                zipCode:"84606",
                city:"PROVO",
                state:"UT",
                country:"USA",
            },
            lastNote: "Customer was not home",
            notesHistory:[{
                note: "Customer was not home",
            }],
            jobType: "RI",
            currentStatus:"In progress",
            lastModifiedBy:"5807a86bf8d0c52d78d5140d", 
            statusHistory:[{
                status:"In progress",
                notes:"Was not home",
                modifiedBy: "5807a86bf8d0c52d78d5140d"
            }],
            currentAssignedTo: {
                _id:"5807a86bf8d0c52d78d5140d"
            },
            assignedToHistory:[{
                _id:"5807a86bf8d0c52d78d5140d"
            }],
            currentAssignedBy:{
                _id:"5807a86bf8d0c52d78d5140d"
            },
            assignedByHistory:[{
                _id:"5807a86bf8d0c52d78d5140d"
            }]

        })

        insert.save(function(err){
            if(err)
             console.log(err)
            pipeline.find({}).populate('_idPeople').exec(function(err,result){
                if(err){

                }else{
                    console.log(result);
                }
            });
        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    //app.get('/login', function(req, res) {
      //      var token = jwt.sign({user: 'Alex'}, app.get('superSecret'));
        //    res.json({ message: 'hooray! with token!', token: token });
   /// });

 
// listen (start app with node server.js) ======================================
//app.listen(8080);
//console.log("App listening on port 8080");
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});























// // Set up
//                                // create our app w/ express
// var mongoose = require('mongoose');                     // mongoose for mongodb
// //Importing Models
// var Clients = require('./models/clients.model.js');
// var pipeline = require('./models/pipeline.model.js');
// var AgingReports = require('./models/agingReports.model.js');
// var ClosingRatio = require('./models/closingRatio.model.js');

// //Changing This order might affect the rendering 
// var express  = require('express');
// var app      = express();
// var morgan = require('morgan');             // log requests to the console (express4)
// var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
// var cors = require('cors');

// //JWT
// //var jwt = require('jsonwebtoken');
// //var expressJwt = require('express-jwt');
// //var config = require('./config'); // get our config file

// //var router = express.Router();              // get an instance of the express Router


// //Connecting to mongoose 
// mongoose.connect('mongodb://localhost/dashboard');

// //app.use(expressJwt({secret: config.secret}).unless({path: ['/login']}))
// //app.set('superSecret', config.secret); // secret variable
// app.use(morgan('dev'));                                         // log every request to the console
// app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
// app.use(bodyParser.json());                                     // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());
// app.use(cors());



// //Solves CROSS errors
// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });
 
// // Routes

 
//     /*************************************************************************************
//      * GETs all the leads in the pipeline collection and populates the idpeople field*****
//     *************************************************************************************/
//     app.get('/api/pipeline', function(req, res) {
  
//         pipeline.find({"currentStatus" : "In progress"}).populate('_idPeople').exec(function(err,result){
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.json(result);   
//                 }
//             });
//     });

//     /*************************************************************************************
//      * GET aging reports******************************************************************
//     *************************************************************************************/
//     app.get('/api/agingReports', function(req, res) {
  
//         AgingReports.find({}).populate('_idCustomer _idSalesRep _idCurrentSubContractor').exec(function(err,result){
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.json(result);   
//                 }
//             });
//     });

//     /*************************************************************************************
//      * GET closing ratio******************************************************************
//      */
//     app.get('/api/closingRatio', function(req, res) {
  
//         ClosingRatio.find({}).populate('_idCustomer').exec(function(err,result){
//                 if(err){
//                     res.send(err)
//                 }else{
//                     console.log(result);
//                     res.json(result);   
//                 }
//             });
//     });

//      /*************************************************************************************
//      * GETs the total number of leads per SALES REP and quarters
//      *************************************************************************************/
//         app.get('/api/closingRatio/totalQuarterSalesRep', function(req, res) {

//         var newId = new mongoose.mongo.ObjectId(req.query.id);
//         // use mongoose to get all reviews in the database
//         var totalLeads = 0;
//         var year = req.query.year;
//         var global = {};
//         var objClosingRatio = [];
//         var quardersMatrix =[
//             {
//                 startDate: new Date(year + "-01-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-03-31T00:00:00.767Z")
//             },
//             {
//                 startDate: new Date(year + "-04-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-06-30T00:00:00.767Z")
//             },
//             {
//                 startDate: new Date(year + "-07-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-09-30T00:00:00.767Z")
//             },
//             {
//                 startDate: new Date(year + "-10-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-12-31T00:00:00.767Z")
//             }
//         ];
//         var count = 1;
//         quardersMatrix.forEach(function(quarter) {
//             ClosingRatio.aggregate([
//                 { $match: { _idCustomer: newId,createdAt: { $gte: quarter.startDate, $lte: quarter.endDate}}}
//                 ,{ $group : {
//                     _id:{status: "$status"},
//                     count: { $sum: 1 },
//                 }}   
//         ],function(err, client) {
//                     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//                     if (err)
//                         res.send(err)
//                     //res.json(client); // return all reviews in JSON format
//                     var obj = [];
//                     var templateObject ={sold: {name: "Sold", count: 0}, didNotBuy: {name: "Didn't buy", count: 0}, inProgress: {name: "In progress", count: 0}, totalLeads: {count: 0}, closingRatio: {count: 0}};
//                     var countElements = 0;
//                     var totalLeads = 0;
//                     client.forEach(function(element) {
//                         switch (element._id.status) {
//                             case "Sold":
//                                 templateObject.sold.count = element.count;
//                                 break;
//                             case "Didn't buy":
//                                 templateObject.didNotBuy.count = element.count;
//                                 break;
//                             case "In progress":
//                                 templateObject.inProgress.count = element.count;
//                                 break;
//                             default:
//                                 break;
//                         }
//                         if(countElements < 1){
//                             objClosingRatio.push(templateObject);
//                         }
//                         countElements++;

//                     }, this);
//                     if(count === 4){
//                         console.log(objClosingRatio);
//                         res.json(objClosingRatio); 
//                     }
//                     count++;
//                 });
//         }, this);
//         });
 
//     /*************************************************************************************
//      * GETs the total number of leads per SALES REP and quarters
//      *************************************************************************************/
//         app.get('/api/closingRatio/totalQuarterCompany/:year', function(req, res) {

//         // use mongoose to get all 
//         var totalLeads = 0;
//         var year = req.params.year;
//         var global = {};
//         var objClosingRatio = [];
//         var quardersMatrix =[
//             {
//                 startDate: new Date(year + "-01-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-03-31T00:00:00.767Z")
//             },
//             {
//                 startDate: new Date(year + "-04-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-06-30T00:00:00.767Z")
//             },
//             {
//                 startDate: new Date(year + "-07-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-09-30T00:00:00.767Z")
//             },
//             {
//                 startDate: new Date(year + "-10-01T00:00:00.767Z"),
//                 endDate: new Date(year + "-12-31T00:00:00.767Z")
//             }
//         ];
//         var count = 1;
//         quardersMatrix.forEach(function(quarter) {
//             ClosingRatio.aggregate([
//                 { $match: { createdAt: {$gte: quarter.startDate, $lte: quarter.endDate}}}
//                 ,{ $group : {
//                     _id:{status: "$status"},
//                     count: { $sum: 1 },
//                 }}   
//         ],function(err, client) {
//                     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//                     if (err)
//                         res.send(err)
//                     //res.json(client); // return all reviews in JSON format
//                     var obj = [];
//                     var templateObject ={sold: {name: "Sold", count: 0}, didNotBuy: {name: "Didn't buy", count: 0}, inProgress: {name: "In progress", count: 0}, totalLeads: {count: 0}, closingRatio: {count: 0}};
//                     var countElements = 0;
//                     var totalLeads = 0;
//                     client.forEach(function(element) {
//                         switch (element._id.status) {
//                             case "Sold":
//                                 templateObject.sold.count = element.count;
//                                 break;
//                             case "Didn't buy":
//                                 templateObject.didNotBuy.count = element.count;
//                                 break;
//                             case "In progress":
//                                 templateObject.inProgress.count = element.count;
//                                 break;
//                             default:
//                                 break;
//                         }
//                         if(countElements < 1){
//                             objClosingRatio.push(templateObject);
//                         }
//                         countElements++;

//                     }, this);
//                     if(count === 4){
//                         console.log(objClosingRatio);
//                         res.json(objClosingRatio); 
//                     }
//                     count++;
//                 });
//         }, this);
//         });
 

   
//     /*************************************************************************************
//      * GETs one lead in the pipeline collection and populates the idpeople field**********
//      *************************************************************************************/
//     app.get('/api/pipeline/one', function(req, res) {
  
//         pipeline.find({}).populate('_idPeople').exec(function(err,result){
//                 if(err){
//                     res.send(err)
//                 }else{
//                     console.log(result,"consoling result");
//                     res.json(result);
                    
//                 }
//             });
//     });

//     /*************************************************************************************
//      * GETs one client in the clients collection and populates the idpeople field*****
//      *************************************************************************************/
//     app.get('/api/clients/one', function(req, res) {
  
//         // use mongoose to get all reviews in the database
//         Clients.findOne(function(err, client) {
 
//             // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err)
//             res.json(client); // return all reviews in JSON format
//         });
//     });

//     /*************************************************************************************
//      * Inserts a client*****
//      *************************************************************************************/
//     app.post('/api/clients', function(req, res) {
//         // create a review, information comes from request from Ionic
//         Clients.create({
//             firstName: req.body.firstName,
//             middleName : req.body.lastName,
//             lastName :req.body.middleName,
//             zipCode: req.body.zip,
//             primaryPhoneNumber: {
//                 number: req.body.primaryPhoneNumber.number,
//                 carrier: req.body.primaryPhoneNumber.carrier,
//                 countryCode: req.body.primaryPhoneNumber.countryCode,
//                 areaCode: req.body.primaryPhoneNumber.areaCode,
//             }, 
//         }, function(err, client) {
//             if (err)
//                 res.send(err);
 
//             // get and return all the clients after you create it
//             Clients.find(function(err, clients) {
//                 if (err)
//                     res.send(err)
//                 res.json(clients);
//             });
//         });
//     });

//     /*************************************************************************************
//      *POSTS / chnages the status of the lead *****
//      *************************************************************************************/
//     app.post('/api/pipeline/updateStatus', function(req, res) {
//         // Update status of the pipeline
//         pipeline.update({
//              _id: req.body._id },
//              { $set: { 
//                  currentStatus: req.body.status,
//                  currentStatusNote: req.body.statusNote
//                },
//             },function(err,pipeline){
//             if(err){
//                 res.send(err)
//             }else{
                
//             }
//         });
//     });


//     /*************************************************************************************
//      *Inserts create a new lead*****
//      *************************************************************************************/
//     app.post('/api/pipeline', function(req, res) {
//         var insert  = new pipeline({
//             _idPeople: "580824ce4111e31428dabebd",
//             sector: "Agrario",
//             marketing:{
//                 source: "Realtor",
//                 extraSource: "5807a86bf8d0c52d78d5140d"
//             },
//             address:{
//                 street:"500 N 200 E",
//                 apt:"5",
//                 zipCode:"84606",
//                 city:"PROVO",
//                 state:"UT",
//                 country:"USA",
//             },
//             lastNote: "Customer was not home",
//             notesHistory:[{
//                 note: "Customer was not home",
//             }],
//             jobType: "RI",
//             currentStatus:"In progress",
//             lastModifiedBy:"5807a86bf8d0c52d78d5140d", 
//             statusHistory:[{
//                 status:"In progress",
//                 notes:"Was not home",
//                 modifiedBy: "5807a86bf8d0c52d78d5140d"
//             }],
//             currentAssignedTo: {
//                 _id:"5807a86bf8d0c52d78d5140d"
//             },
//             assignedToHistory:[{
//                 _id:"5807a86bf8d0c52d78d5140d"
//             }],
//             currentAssignedBy:{
//                 _id:"5807a86bf8d0c52d78d5140d"
//             },
//             assignedByHistory:[{
//                 _id:"5807a86bf8d0c52d78d5140d"
//             }]

//         })

//         insert.save(function(err){
//             if(err)
//              console.log(err)
//             pipeline.find({}).populate('_idPeople').exec(function(err,result){
//                 if(err){

//                 }else{
//                     console.log(result);
//                 }
//             });
//         });
//     });

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//     //app.get('/login', function(req, res) {
//       //      var token = jwt.sign({user: 'Alex'}, app.get('superSecret'));
//         //    res.json({ message: 'hooray! with token!', token: token });
//    /// });

 
// // listen (start app with node server.js) ======================================
// app.listen(8080);
// console.log("App listening on port 8080");