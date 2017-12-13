'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6060
app.set('port', port)
const request = require('request');
const needle = require('needle');
const auth = require('basic-auth')


const username = process.env.ghusername;
const password = process.env.ghpassword;


// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/student/commit/*', (req, res) => {
  
  let apiCall = req.url.slice('/student/commit/'.length)
  
  var options = {
    headers: { 
      'User-Agent': 'megducharme',
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    }
  }

  needle("get", apiCall, null, options)
    .then(
      function(response) {
        res.send(response.body)
        console.log(response)
    });
});


app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)