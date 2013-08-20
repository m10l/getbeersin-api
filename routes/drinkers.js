//	===========================
//	GET THE BEERS IN - DRINKERS
//	===========================

// Our Requirements
var mongo = require('mongodb');

// Our MongoDB Server
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server( 'localhost', 27017, { auto_reconnect: true } );
db = new Db( 'drinkerdb', server, { w : 1 }, { safe : true } );

// Connect to Database or Create Database from Dummy Data

db.open( function( error, db){

	if( !error ){

		console.log('Connected to \'drinker\' database' );

		db.collection( 'drinkers', { strict:true }, function( error, collection ){

			if ( error ){
				console.log('Database doesn\'t exist - Creating new database with dummy data');
				populateDB();
			}

		});

	}

});

//	=============================
//	API Method: Get drinker by ID
//	=============================

exports.findById = function( request, response ){

	var id = request.params.id;
	console.log( 'Getting drinker ID:' + id );

	db.collection( 'drinkers', function( error, collection ){
		collection.findOne( { '_id' : new BSON.ObjectID( id ) }, function( error, item ){
			response.send( item );
		});
	});

};

//	============================
//	API Method: Get all drinkers
//	============================

exports.findAll = function( request, response ){

	db.collection( 'drinkers', function( error, collection ){
		collection.find().toArray( function( error, items ){
			response.send( items );
		});
	});

};

//	=========================
//	API Method: Add a Drinker
//	=========================

exports.addDrinker = function( request, response ){

	var drinker = request.body;
	console.log( 'Adding Drinker:' + JSON.stringify( drinker ) );

	db.collection( 'drinkers', function( error, collection ){
		collection.insert( drinker, { safe: true }, function( error, result ){

			if( error ){
				response.send( { 'error' : 'An error has occurred' } );
			} else {
				console.log( 'Success: ' + JSON.stringify( result[0] ) );
				response.send( result[0] );
			}

		});
	});

};

//	============================
//	API Method: Update a Drinker
//	============================

exports.updateDrinker = function( request, response ){

	var id = request.params.id,
		drinker = request.body;

	console.log( 'Updating drinker: ' + id );
	console.log( JSON.stringify( drinker ) );

	db.collection( 'drinkers', function( error, collection ){
		collection.update( { '_id' : new BSON.ObjectID( id ) }, drinker, { safe : true }, function( error, result ){

			if( error ){
				console.log( 'Error updating drinker: ' + error );
				response.send( { 'error' : 'An error has occurred' } );
			} else {
				console.log( '' + result + ' document(s) updated' );
				response.send( drinker );
			}

		});
	});

};

//	============================
//	API Method: Delete a Drinker
//	============================

exports.deleteDrinker = function( request, response ) {

	var id = request.params.id;
	console.log( 'Deleting drinker: ' + id );

	db.collection( 'drinkers', function( error, collection ){
		collection.remove( { '_id' : new BSON.ObjectID( id ) }, { safe : true }, function( error, result ) {

			if ( error ){
				response.send( { 'error' : 'An error has occurred - ' + error } );
			} else {
				console.log( '' + result + ' document(s) deleted' );
				response.send( request.body );
			}

		});
	});

};

//	============================================================
//	FUNCTION FOR POPULATING DATABASE - RUN ONCE THEN COMMENT OUT
//	============================================================

var populateDB = function() {

	var drinkers = [

		{
			name: 'Dan'
		},
		{
			name: 'Mike'
		},
		{
			name: 'Nathan'
		},
		{
			name: 'Paul'
		},
		{
			name: 'Rob'
		}

	];

	db.collection( 'drinkers', function( error, collection ){
		collection.insert( drinkers, { safe : true }, function( error, result ) {} );
	});

};