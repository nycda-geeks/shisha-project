var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser');
var app = express()
//app.use(bodyParser.urlencoded ({extended: false}));
//app.use(express.static('./static'));

app.use( express.static( __dirname + '/public' ) )
app.use( bodyParser.urlencoded( { extended: false } ) )


// this means thats about the database called shisha

var sequelize = new Sequelize('shisha', 'postgres', "Selim0ruc", {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
});

//this makes a table called lounges (he adds an "s" automatically)
var Lounge = sequelize.define('lounge', {
	loungeName: Sequelize.STRING,
	tel: Sequelize.STRING,
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

//this is te relationship between tables
Lounge.hasMany(Menu);
Menu.belongsTo(Lounge);



//app.set ("views", "src/views");
//app.engine( 'html', require( 'ejs' ).renderFile )

app.set( 'views', __dirname + '/views' )
app.engine( 'html', require( 'ejs' ).renderFile )

//this is the index page
app.get ( '/', function ( request, response ) {
	response.render ( 'index.html' )  
} )

// this is the test page that renders the index
app.get ('test.html',function (request,response){
    response.render('index.html')
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
