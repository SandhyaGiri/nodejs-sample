var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done){
		if(username === 'sagiri' && password === 'sampleebay'){
			return done(null, {username:'sagiri'});
		}else{
			return done(null, false);
		}
	}
));

passport.serializeUser(function(user, done){
	done(null, user.username);
});

passport.deserializeUser(function(username, done){
	done(null, {username: username});
});

module.exports = passport;