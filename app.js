const express = require('express');
const app = express();



/***   CHANGE THE PORT TO 8080 FOR PROD */
const port = process.env.PORT || 3000;



app.get('/', (req, res)=>{

  console.log('request received: '+JSON.stringify(req.headers));
  
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host: '162.241.61.133',
    user: 'staffity_root',
    password: 'scammacs',
    database: 'staffity_db'
  });
  
  connection.connect()
  
  connection.query('SELECT * FROM CONTACT_FORM', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows)

    res.send(rows);
  });
  
  connection.end();


});

/*

app.post('/api/contact-form', (req, res)=>{

});*/

app.listen(port, ()=> console.log('the port is:'+port));
