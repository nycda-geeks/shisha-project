var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser');

var app = express()
//app.use(bodyParser.urlencoded ({extended: false}));
//app.use(express.static('./static'));

app.use( express.static( __dirname + '/public' ) )
app.use( bodyParser.urlencoded( { extended: false } ) )


// this means thats about the database called shisha

var sequelize = new Sequelize('shisha', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});

//this makes a table called lounges (he adds an "s" automatically)
var Lounge = sequelize.define('lounge', {
	loungeName: Sequelize.STRING,
	tel: Sequelize.INTEGER,
	postcode: Sequelize.STRING,
	streetName: Sequelize.STRING,
	houseNumber: Sequelize.INTEGER,
	city: Sequelize.STRING
});

// this makes a table called menus (he adds an "s" automatically

var Menu = sequelize.define('menu', {
	selectionFood: Sequelize.TEXT,
	selectionDrinks: Sequelize.TEXT,
	selectionShisha: Sequelize.TEXT
})

Lounge.hasMany(Menu);
Menu.belongsTo(Lounge);

app.set('views', './src/views');
app.set('view engine', 'jade');

//this is the index page
app.get ( '/', function ( request, response ) {
	response.render ( 'index' )
} )

app.get('/lounge',function(request,response){
	city = request.query.city

	Lounge.findAll({
		where:{
			city: request.query.city
		}
	}).then(function(thelounge){
		response.render('lounge',{lijst: thelounge});
	})	
})

app.get ( '/results', function ( request, response ) {
	response.render ( 'results', {
		lounges: lounges
	} )
} )

app.post ( '/search', function ( request, response ) { 
	var input = request.body.entry
	var searchParameter = input.toLowerCase();

	if ( request.body.options == "city") {
		Lounge.findAll({
			where: {
				city: searchParameter
			}
		}).then(function(lounges){
			response.render( 'results', {
				lounges: lounges
			} )
		})
	}
	else if ( request.body.options == "loungeName") {
		Lounge.findAll({
			where: {
				loungeName: searchParameter
			}
		}).then(function(lounges){
			response.render( 'results', {
				lounges: lounges
			} )
		})
	}
	else if ( request.body.options == "loungeStreet") {
		Lounge.findAll({
			where: {
				loungeStreet: searchParameter
			}
		}).then(function(lounges){
			response.render( 'results', {
				lounges: lounges
			} )
		})
	}
	else {
		response.send("Please choose a search parameter")
	}
})

// this is the test page that renders the index
app.get ('/test',function (request,response){
	response.render('index')
})

app.get ('/amsterdam', function ( request, response ) {
	Lounge.findAll({
		where: {
			city: amsterdam
		}
	}).then(function(){
		response.render( 'amsterdam', { 
			lounges: lounges
		})
	})
})

app.get ('/rotterdam', function ( request, response ) {
	Lounge.findAll({
		where: {
			city: rotterdam
		}
	}).then(function(){
		response.render( 'rotterdam', { 
			lounges: lounges
		})
	})
})

app.get ('/utrecht', function ( request, response ) {
	Lounge.findAll({
		where: {
			city: utrecht
		}
	}).then(function(){
		response.render( 'utrecht', { 
			lounges: lounges
		})
	})
})

app.post('/', function (request,response){
	var stad = request.body.city
	var straat = request.body.streetName
	var naam = request.body.loungeName

	var city = stad.toLowerCase()
	var street = straat.toLowerCase()
	var name = naam.toLowerCase()

	Lounge.create({
		loungeName: name,
		streetName: street,
		houseNumber: request.body.houseNumber,
		postcode: request.body.postcode,
		city: city,
		tel: request.body.tel
	}).then(function(){
		response.render('index')
	})
})

sequelize.sync({force: false})
var server = app.listen(3000 , function (){

	console.log("example app listening on port : " + server.address().port)
})
