/* 
 * WelchServer
 * server.js File
 *
 * Main Node Server
 *
 * By: Cory Welch
*/

/*
** ||--------------------||
** || Server Definitions ||
** ||--------------------||
*/ 

const HTTP = require('http');
const HTTPS = require('https');

const URL = require('url');
const PATH = require('path');

const FS = require('fs');

const express = require('express');

const microstats = require('microstats'); // https://github.com/sv-code/microstats MIT License

const PORT = 8080;  // If below 1024 sudo requried. HTTP Regular
const PORTS = 4433; // If below 1024 sudo required. HTTPS Secure

if(process.argv[2]){
    PORT = process.argv[2]; //If Specificied
}
if(process.argv[3]){
    PORTS = process.argv[2]; //If Specificied
}

var DATA = {
	serverStatus: {
		memory: {}, // Information about used memory
		cpu: {},    // Information about used cpu
		disk: {},   // Information about used disk
		lastUpdated: new Date() // Last Updated Time for Microstats
	}
};

/*
** ||---------------||
** || Setup Server  ||
** ||---------------||
*/ 

var app = express();
var server = http.createServer(app);

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

// Function to Update serverStatus using microstats
function updateServerStatus(){

    var memory = {};
    var cpu = {};
    var disk = {};

    microstats.on('memory', function (value){
        //console.log('MEMORY:', value);
        memory = value;
    });

    microstats.on('cpu', function (value){
       //console.log('CPU:', value);
       cpu = value;
    });

    microstats.on('disk', function (value){
       //console.log('DISK:', value);
       disk = value;
    });

    var options = { frequency: 'once' };
    microstats.start(options, function (err){
      if(err) console.log(err);
    });

    setTimeout(function(){
        microstats.stop();
        DATA.serverStatus.lastUpdated = new Date(Date.now());;
        DATA.serverStatus.memory = memory;
        DATA.serverStatus.cpu = cpu;
        DATA.serverStatus.disk = disk;

    }, 500);
}

function serverStartup() {
    updateServerStatus();
    setTimeout(function () {
        console.log('All Startup Procedues Done');
        server.listen(port);
        console.log("Listening on port "+PORT);
    }, 2000);
}

/*
** ||-------------||
** || Main Server ||
** ||-------------||
*/ 

var mainRoutes = express.Router();

mainRoutes.get('/', function (req, res){
	res.sendFile(PATH.join(__dirname,'public','index.html'));
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
        message: 'Welch Server API'
    });   
});

apiRoutes.get('/serverStatus', function (req, res){
    var now = new Date(Date.now());
        if(!DATA.serverStatus.lastUpdated || (now - DATA.serverStatus.lastUpdated > 10*1000)){ //10 second interval to get server stats
            updateServerStatus();
            setTimeout(function () {
                res.json({ 
                    date: now,
                    data: DATA.serverStatus
                });
            },750);
        } else {
            res.json({ 
                date: now,
                data: DATA.serverStatus
            }); 
        }
});

apiRoutes.get('/date', function (req,res){
    var date = new Date();
    res.json({
        date: date
    });
});

app.use('/api', apiRoutes);


/*
** ||-----------------||
** || Begin Listening ||
** ||-----------------||
*/ 

serverStartup();

