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

    const username = request.body.username;
    const password = request.body.password;

    if (username != undefined && password != undefined) {
        conexion.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {

            if (error) {
                console.log('La cagaste 1!');
                throw error;
            }
            console.log(results[0]);
            //console.log(error);
            if (results.length <= 0) {
                console.log('User/Password incorrect');
                request.flash('error', 'Please correct enter email and Password!');
                //res.send('User/Password incorrect');
                response.redirect('/login');
            }             
            else if (results[0].password == password && results[0].username == username) {
                //req.session.loggedIn = true;
                //req.session.username = username;
                //res.send("User OK");
                console.log('Entraste!');

                response.render('pages/welcome', {
                    username: username,
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

/*app.post('/login', function (req, res) {

    const username = req.body.username;
    const password = res.body.password;

    if (username != undefined && password != undefined) {

        conexion_db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            console.log('La cagaste 1!');
            console.log(results[0]);
            console.log(error);
            enrollUser.main_enrollUser(username);
            //User not found
            if (results.length == 0 && checkUsers(results[0].nombre) == false) {
                console.log('User/Password incorrect');
                    req.flash('error', 'User/Password incorrect')
                    res.render('/sign_in');
            }
            else {
                const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
                if (bcrypt.compare(password, hashedPassword)) {
                   
                    console.log("---------> Login Successful")
                    console.log(password);
                    console.log(hashedPassword);

                    res.render('pages/welcome', {
                        username: username,
                        data: results,
                    });
                    //res.send(`${email} is logged in!`);


                } else {
                    console.log("---------> Password Incorrect")
                    
                    console.log(password);
                    console.log(hashedPassword);
                    //res.send("Password incorrect!")
                    console.log('User/Password incorrect');
                    req.flash('error', 'User/Password incorrect')
                    res.render('/login');
                }
            }



        });
    };
});*/

app.get('/welcome', function (req, res) {
    res.render('pages/welcome');
});

// register page
app.get('/register', function (req, res) {
    res.render('pages/register');
});

app.post('/register', function (request, response) {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;

    if (username != undefined && password != undefined && email != undefined) {
        conexion.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
            console.log(results[0]);
            //console.log(error);
            if (results.length > 0) {
                
                request.flash('error');
                response.send('This email already registered, try to login or try another email');
                //response.redirect('/register');
                response.end();
            }  else { conexion.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
                    console.log(results[0]);
                    //console.log(error);
                    if (results.length > 0) {
                    
                        request.flash('error');
                        response.send('This username already registered, try another user');
                        //response.redirect('/register');
                        response.end();
                    }
                });
            }
        });
    }else {
        response.send('Please enter Username, Password and Email');
        response.end();
    }
});

app.listen(8080);
console.log('listening on port 8080');