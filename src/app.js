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

app.set( 'views', __dirname + '/views' )
app.engine( 'html', require( 'ejs' ).renderFile )

//this is the index page
app.get ( '/', function ( request, response ) {
	response.render ( 'index.html' )
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
	Post.findall({
		where: {
			key: request.body.entry
		}
	})
	response.send( "Search completed:" + "<br>" + "here will go results", {
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: potcode,
		city: city,
		tel: tel
	})
} )

// this is the test page that renders the index
app.get ('test.html',function (request,response){
	response.render('index.html')
})

app.get ('/amsterdam', function ( request, response ) {
	Post.findAll({
		where: {
			city: amsterdam
		}
	})
	response.render( 'amsterdam.html', { 
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: postcode,
		city: city,
		tel: tel
	})
})

app.get ('/rotterdam', function ( request, response ) {
	Post.findAll({
		where: {
			city: rotterdam
		}
	})
	response.render( 'rotterdam.html', { 
		loungeName: loungeName,
		streetName: streetName,
		houseNumber: houseNumber,
		postcode: potcode,
		city: city,
		tel: tel
	})
})

app.get ('/utrecht', function ( request, response ) {
	Post.findAll({
		where: {
			city: utrecht
		}
	})
	response.render( 'utrecht.html', { 
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
		response.render('test.html')
	})
})

sequelize.sync({force: false})
var server = app.listen(3000 , function (){

	console.log("example app listening on port : " + server.address().port)
})
