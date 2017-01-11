module.exports = function(info){

	var flight = {
		number : null,
		origin: null,
		destination: null,
		departedAt: null,
		arrivedAt: null
	};

	for(var prop in flight){
		if(flight[prop] !== 'undefined'){
			flight[prop] = info[prop];
		}
	}

	var functions = {
		triggerDepart : function(){
			flight.departedAt = new Date();
		},
		triggerArrival : function(){
			flight.arrivedAt = new Date();
		},
		getInfo : function(){
			return flight;
		}
	};
	return functions;
};