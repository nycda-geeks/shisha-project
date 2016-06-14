var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser');

var sequelize = new Sequelize('shisha', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});

var Lounge = sequelize.define('lounge', {
	loungeName: Sequelize.STRING,
	tel: Sequelize.INTEGER,
	postcode: Sequelize.STRING,
	streetName: Sequelize.STRING,
	houseNumber: Sequelize.INTEGER,
	city: Sequelize.STRING
});

var Menu = sequelize.define('menu', {
	selectionFood: Sequelize.TEXT,
	selectionDrinks: Sequelize.TEXT,
	selectionShisha: Sequelize.TEXT
})

Lounge.hasMany(Menu);
Menu.belongsTo(Lounge);

var app = express();

app.set( 'views', __dirname + '/views' )
app.engine( 'html', require( 'ejs' ).renderFile )

app.use( express.static( __dirname + '/static' ) )
app.use( bodyParser.urlencoded( { extended: false } ) )

app.get ( '/', function ( request, response ) {
	response.render ( 'index.html' )  
} )

sequelize.sync({force: false}).then(function () {
	Lounge.create({
		username: "roger",
		email: "roger@nycda.cool",
		password: "password"
	}).then(function () {
		var server = app.listen(3000, function () {
			console.log('Example app listening on port: ' + server.address().port);
		});
	});
}, function (error) {
	console.log('sync failed: ');
	console.log(error);
});