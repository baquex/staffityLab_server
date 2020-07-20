const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res)=>{

  console.log('request received: '+JSON.stringify(req.headers));

  res.send('hello world!');

});

app.listen(port, ()=> console.log('now listening on localhost:'+port));
