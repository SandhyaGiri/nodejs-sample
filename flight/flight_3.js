/* Leveraging module caching */
var Flight = function(){
	this.data = {
		number : null,
		origin: null,
		destination: null,
		arrives: null,
		departs: null,
		departedAt: null,
		arrivedAt: null
	};

	this.fill = function(info){
		for(var prop in this.data){
			if(this.data[prop] !== 'undefined'){
				this.data[prop] = info[prop];
			}
		}
	};

	this.triggerDepart = function(){
		this.data.departedAt = Date.now();
	};

	this.triggerArrival = function(){
		this.data.arrivedAt = Date.now();
	};

	this.getInfo = function(){
		return this.data;
	};
};

var no_of_flights = 0;
var destinations = [];

exports.createFlight = function(info){
	var instance = new Flight();
	instance.fill(info);

	no_of_flights+=1;
	if(destinations.indexOf(info['destination']) < 0){
		destinations.push(instance.getInfo().destination);
	}
	return instance;
};

exports.getNumberOfFlights = function(){
	return no_of_flights;
};

exports.getDestinations = function(){
	return destinations;
};