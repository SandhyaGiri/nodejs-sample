var app = require('./helpers/app');

var should = require('should'),
	supertest = require('supertest');

describe('Flight tests', function(){

	it('should return valid test data', function(done){
			
		supertest(app)
		.get('/flight/33')
		.expect(200)
		.end(function(err, res){
			res.status.should.equal(200);
			done();
		});
	});

	it('should return 404 for unkown flights', function(done){

		supertest(app)
		.get('/flight/99999999')
		.expect(404)
		.end(function(err, res){
			res.status.should.equal(404);
			done();
		});
	});

	it('should change the flight arrival time', function(done){

		supertest(app)
		.put('/flight/33/arrived')
		.expect(200)
		.end(function(err, res){
			res.status.should.equal(200);
			res.body.status.should.equal('done');

			supertest(app)
			.get('/flight/33')
			.expect(200)
			.end(function(err, res){
				res.status.should.equal(200);
				res.body.arrivedAt.should.not.equal(null);
				done();
			});
		});
	});
});