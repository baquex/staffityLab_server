const express = require('express');
const app = express();
const db = require('./config');
const bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());

//Usar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

const port = process.env.PORT || 8080;


//validador de Token
app.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.headers['x-access-token'];
  
  if(token == 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    next();
});



/**  CONTACT FORM SUBMIT */
app.post('/api/contact-form', (req, res)=>{
 
  /*create connection to db */
  var mysql = require('mysql');
  var connection = mysql.createConnection(db);
  connection.connect();

  var form_data  = {
                    name: req.body.name, 
                    email: req.body.email,
                    subject: req.body.subject, 
                    message: req.body.message
                  };

  connection.query('INSERT INTO CONTACT_FORM SET ?', form_data, function (error, results, fields) {
    if (error) throw error;
    if (results) console.log(results);
    if (fields) console.log(fields);
   
    res.json("success");
  });
  
  connection.end();


});

/*
app.get('/api/contact-form', (req, res)=>{

  console.log('request received: '+JSON.stringify(req.headers));
  
  var mysql = require('mysql');
  var connection = mysql.createConnection(db);
  
  connection.connect();
  
  connection.query('SELECT * FROM CONTACT_FORM', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows)

    res.json(rows);
  });
  
  connection.end();


});*/

app.listen(port, ()=> console.log('working on port:'+port));
