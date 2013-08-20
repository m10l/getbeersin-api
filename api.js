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

// API Methods

// Get the full JSON
api.get( '/drinkers', drinkers.findAll );

// Get by specific ID
api.get( '/drinkers/:id', drinkers.findById );

api.post( '/drinkers', drinkers.addDrinker );
api.put( '/drinkers/:id', drinkers.updateDrinker );
api.delete( '/drinkers/:id', drinkers.deleteDrinker );

// Listen on port 1337
api.listen( 1337 );