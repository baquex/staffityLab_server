const express = require('express');
const app = express();
const db = require('./config');



/***   CHANGE THE PORT TO 8080 FOR PROD */
const port = process.env.PORT || 8080;



app.get('/api/contact-form', (req, res)=>{

  console.log('request received: '+JSON.stringify(req.headers));
  
  var mysql = require('mysql');
  var connection = mysql.createConnection(db);
  
  connection.connect();
  
  connection.query('SELECT * FROM CONTACT_FORM', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows)

    res.send(rows);
  });
  
  connection.end();


});



// app.post('/api/contact-form', (req, res)=>{



// });

app.listen(port, ()=> console.log('working on port:'+port));
