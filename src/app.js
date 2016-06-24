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

app.get ('/test',function (request,response){
	response.render('index')
})

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

app.get ( '/results', function ( request, respomse ) {
	response.render ( 'results', {
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: postcode,
		city: city,
		tel: tel
	} )
} )

app.post ( '/search', function ( request, response ) { 
	if ( request.body.options == "Stad") {
		key = city
	}
	else if ( request.body.options == "Naam") {
		key = loungeName
	}
	else if ( request.body.options == "Straat") {
		key = streetName
	}
	else {
		response.send("Please choose a search parameter")
	}
	Lounge.findall({
		where: {
			key: request.body.entry
		}
	})
	response.render( 'results', {
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: potcode,
		city: city,
		tel: tel
	} )
} )

// this is the test page that renders the index
app.get ('/test',function (request,response){
	response.render('index')
})

app.post('/test', function (request,response){
	Lounge.create({
		loungeName: request.body.loungeName,
		streetName: request.body.streetName,
		houseNumber: request.body.houseNumber,
		postcode: request.body.postcode,
		city: request.body.city,
		tel: request.body.tel
	}).then(function(){
		response.render('index')
	})
})

app.get ('/amsterdam', function ( request, response ) {
	Lounge.findAll({
		where: {
			city: amsterdam
		}
	})
	response.render( 'amsterdam', { 
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: postcode,
		city: city,
		tel: tel
	})
})

app.get ('/rotterdam', function ( request, response ) {
	Lounge.findAll({
		where: {
			city: rotterdam
		}
	})
	response.render( 'rotterdam', { 
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: potcode,
		city: city,
		tel: tel
	})
})

app.get ('/utrecht', function ( request, response ) {
	Lounge.findAll({
		where: {
			city: utrecht
		}
	})
	response.render( 'utrecht', { 
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: postcode,
		city: city,
		tel: tel
	})
})

app.post('/', function (request,response){

	Lounge.create({
		loungeName: request.body.loungeName,
		streetName: request.body.streetName,
		houseNumber: request.body.houseNumber,
		postcode: request.body.postcode,
		city: request.body.city,
		tel: request.body.tel
	}).then(function(){
		response.render('test')
	})
})

sequelize.sync({force: false})
var server = app.listen(3000 , function (){

	console.log("example app listening on port : " + server.address().port)
})
