module.exports = function(flights){
var express = require('express');
var router = express.Router();

var flight = require('../flight');
var FlightSchema = require('../schemas/flight');

for(var number in flights){
	flights[number] = flight.createFlight(flights[number]);
}


/* GET home page. */
router.get('/arrivals', function(req, res){
  //retrieves the arrival flight info from mongodb
  FlightSchema.find()
  .setOptions({sort:'arrivedAt'})
  .exec(function(err, arrivals){
    if(err){
        console.log(err);
        res.status(500).json({'status':'failure'});
      } else {
        res.locals.title = 'All arrivals';
        res.locals.arrivals = arrivals;
        res.locals.lastNumber = req.session.lastNumber;
        res.render('arrivals');
      }
  });
});

router.get('/list', function(req,res,next){
  res.locals.title = 'All Flights';
  res.locals.flights = flights;
  res.render('list');
});

router.get('/list/json', function(req,res,next){
  var flightsinfo =[];
  for(var number in flights){
    flightsinfo.push(flights[number].getInfo());
  }
  res.json(flightsinfo);
});

router.get('/flight/:number', function(req, res, next) {
  var flight_no = req.params.number;
  req.session.lastNumber = flight_no;
  if(typeof flights[flight_no] !== 'undefined'){
  	res.json(flights[flight_no].getInfo());
  } else {
  		res.status(404).json({"status":"error"});
  }
});

router.put('/flight/:number/arrived', function(req,res,next){
	var flight_no = req.params.number;
  if(typeof flights[flight_no] !== 'undefined'){
  	flights[flight_no].triggerArrival();
  	// saves the arrival flight info in mongo db
  	var record = new FlightSchema(flights[flight_no].getInfo());
  	record.save(function(err){
  		if(err){
  			console.log(err);
  			res.status(500).json({'status':'failure'});
  		} else {
  			res.status(200).json({'status':'success'});
  		}
  	});
  } else {
  	res.status(404).json({"status":"error"});
  }
});

return router;
};