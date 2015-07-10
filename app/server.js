// set up ======================================================================
// get all the tools we need
var express  = require('express');
var url      = require('url');
var app      = express();
var port     = process.env.PORT || 8080;

var passport     = require('passport');
var flash        = require('connect-flash');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

// configuration ===============================================================
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'zenappisthebestappeverdontyouthink' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes and API ==============================================================
require('./routes/api.js')(app, passport, url); // load our API and routes

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

// temporary node server for static files ======================================
// this will eventually be on a subdomain
var http = require('http'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'xml': 'application/xml',
    'css': 'text/css',
    'swf': 'application/x-shockwave-flash',
    'mp4': 'video/mp4'
};

http.globalAgent.maxSockets = 30;
http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname,
        filename = path.join(process.cwd(), 'dist', uri);

    fs.exists(filename, function(exists) {
        if(!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain',
            });
            res.write('404 Not Found\n');
            res.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }


        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write(err + '\n');
                res.end();
                return;
            }

            var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
            res.writeHead(200, {
                'Content-Type': mimeType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.write(file, 'binary');
            res.end();
        });
    });
}).listen(8079);

console.log('serving static files on port 8079');