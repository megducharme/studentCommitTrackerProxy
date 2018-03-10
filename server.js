'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6060
app.set('port', port)
const request = require('request')
const needle = require('needle')
const auth = require('basic-auth')
const path = require('path')
const fs = require('fs')
const https = require('https')

// Retrieve relevent environment variables
const username = process.env.ghusername;
const password = process.env.ghpassword;
const environment = process.env.NODE_ENVIRONMENT;
const otpToken = process.env.GITHUB_TOKEN;


// MIDDLEWARE (transform stream)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/student/commit/*', (req, res) => {
  const options = {}
  let apiCall = req.url.slice('/student/commit/'.length)

  if (otpToken === null) {
    options.headers = {
      'User-Agent': 'nashville-software-school',
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    }

  } else {
    options.headers = {
      'User-Agent': 'nashville-software-school',
      'Authorization': `token ${otpToken}`
    }
  }


  needle("get", apiCall, null, options)
    .then(
      function (response) {
        res.send(response.body)
        console.log(response)
      });
});

if (environment === "Development") {
  require('ssl-root-cas')
    .inject()
    .addFile(path.join(__dirname, 'server', 'my-private-root-ca.cert.pem'));

  const options = {
    key: fs.readFileSync(path.join(__dirname, 'server', 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'server', 'fullchain.pem'))
  };

  const server = https.createServer(options, app).listen(port, function () {
    const port = server.address().port;
    console.log('Listening on https://127.0.0.1:' + port);
    console.log('Listening on https://' + server.address().address + ':' + port);
    console.log('Listening on https://proxy.localhost:' + port);
  });
} else if (environment === "Production") {
  app.listen(port, () =>
    console.log(`Student spy proxy is now running

    Listening on https://${server.address().address}:${port}
    Listening on http://127.0.0.1:${port}`)
  )
}