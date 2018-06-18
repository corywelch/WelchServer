/* 
 * Welch Internet of Things Webserver
 * server.js File
 *
 * Main Server Configuration File
 *
 * Cory Welch
 * corywelch.ca 
 * https://github.com/corywelch
*/

/*
** ||--------------------||
** || Server Definitions ||
** ||--------------------||
*/ 

const HTTP = require('http');

const URL = require('url');
const PATH = require('path');

const FS = require('fs');

const express = require('express');

var mongo = require('mongodb'); 

const PORT = 8080;  // If below 1024 sudo requried. HTTP Regular

/*
** ||---------------||
** || Setup Server  ||
** ||---------------||
*/ 

var app = express();
var server = HTTP.createServer(app);

/*
** ||----------------||
** || Resource Paths ||
** ||----------------||
*/ 

app.use('/', express.static(PATH.join(__dirname,'/public'))); //Will serve any file in public folder if directly asked for (index.html included)
app.use('/js', express.static(PATH.join(__dirname, '/node_modules/jquery/dist'))); // redirect for jquery
app.use('/js', express.static(PATH.join(__dirname, '/node_modules/bootstrap/dist/js'))); // redirect for Bootstrap JS
app.use('/css', express.static(PATH.join(__dirname, '/node_modules/bootstrap/dist/css'))); // redirect for Bootstrap CSS


/*
** ||----------------------||
** || Function Definitions ||
** ||----------------------||
*/ 


function serverStartup() {
    setTimeout(function () {
		console.log('info','All Startup Procedues Done');
        server.listen(PORT);
        console.log('info','Listening on port',{PORT: PORT});
    }, 2000);
}


/*
** ||------------||
** || API Server ||
** ||------------||
*/ 

var apiRoutes = express.Router();

apiRoutes.get('/', function (req, res){
    var date = new Date();
    res.json({ 
        date: date,
        author: 'Cory Welch',
        website: 'corywelch.ca',
        message: 'Welch Server API'
    });   
});

apiRoutes.get('/date', function (req,res){
    var date = new Date();
    res.json({
        date: date,
        timezoneoffset: -1 * date.getTimezoneOffset()
    });
});

app.use('/', apiRoutes);


/*
** ||-----------------||
** || Begin Listening ||
** ||-----------------||
*/ 

serverStartup();

