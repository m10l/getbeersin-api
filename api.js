// Get The Beers In API

// Our Requirements
var express = require('express'),
	drinkers = require('./routes/drinkers');

// Our API
var api = express();

// Configure our API
api.configure( function(){
	api.use( express.logger('dev') ); /* 'default', 'short', 'tiny', 'dev' */
	api.use( express.bodyParser()) ;
});

// API Routes

// Cross Domain Access for our front end
api.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
	next();
});

// DRINKERS
// ========

// Get all Drinkers
api.get( '/drinkers', drinkers.findAll );

// Get Drinker by Specific ID
api.get( '/drinker/:id', drinkers.findById );

// Add New Drinker
api.post( '/drinker', drinkers.addDrinker );

// Update Drinker by Specific ID
api.put( '/drinker/:id', drinkers.updateDrinker );

// Delete Drinker by Specific ID
api.delete( '/drinker/:id', drinkers.deleteDrinker );

// Listen on port 1337
api.listen( 1337 );