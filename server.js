// load the things we need
/*const { response } = require('express');
var express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');*/

// load the things we need
'use strict'
import express from 'express'
import {
    createRequire
} from 'module';
const require = createRequire(
    import.meta.url);
import {
    fileURLToPath
} from 'url';
const __filename = fileURLToPath(
    import.meta.url);
import {
    dirname
} from 'path';
const __dirname = dirname(__filename);


// load the things we need
'use strict'
const app = express();
//const express = require('express'),
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

let mysql = require('mysql');
const session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const popup = require('node-popup');
//const popup = require('node-popup/dist/cjs.js');

var flash = require('connect-flash');
app.use(flash());

app.use(session({
    secret: 'secret',
    name: 'uniqueSessionID',
    resave: true,
    saveUninitialized: true
}));
var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'web_db',
    user: 'root',
    password: '123456789',
});

conexion.connect(function (err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Connected!:)');
});

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function (req, res) {
    res.render('pages/about');
});

// login page
app.get('/login', function (req, res) {
    res.render('pages/login');
});

app.post('/login', function (request, response) {

    const email = request.body.email;
    const password = request.body.password;
    
    //const email;

    if (email != undefined && password != undefined) {
        conexion.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {

            if (error) {
                throw error;
            }
            console.log(results[0]);
            //console.log(error);
            if (results.length <= 0) {
                console.log('Email/Password incorrect');
                request.flash('error', 'Please correct enter email and Password!');
                response.redirect('/login');
            }             
            else if (results[0].password == password && results[0].email == email) {
                //req.session.loggedIn = true;
                //req.session.username = username;
                //res.send("User OK");
                console.log('Entraste!');
                const name = results[0].name;

                response.render('pages/welcome', {
                    name: name,
                    data: results,
                });
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();

        });
    }
    else {
        response.send('Please enter Username and Password!');
        response.end();
    }

});

app.get('/welcome', function (req, res) {
    res.render('pages/welcome');
});

// register page
app.get('/register', function (req, res) {
    res.render('pages/register');
});

app.post('/register', function (request, response) {
    const name = request.body.name;
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;

    if (name != undefined && username != undefined && password != undefined && email != undefined) {
        conexion.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
            
            if (error) {
                throw error;
            }
            console.log(results[0]);
            //console.log(error);
            if (results.length > 0) {
                
                request.flash('error');
                response.send('This email already registered, try to login or try another email');
                //response.redirect('/register');
                response.end();
            }  else { conexion.query('INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)', [name, username, email, password], function (error, results, fields) {
                    
                    console.log(results[0]);
                    if (error) {
                        throw error;
                    }
                    else{
                        
                        //console.log(error);
                        //import alert from 'node-popup';
                        //alert('Register successfull, please login');
                        
                        response.render('pages/login');
                        response.end();
                    }
                });
            }
        });
    } else {
       // import alert from 'node-popup';
        //alert('Please enter all the required data');

        response.render('pages/register');
        response.end();
    }
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});


app.listen(8080);
console.log('listening on port 8080');