/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**********************
 * Example get method *
 **********************/

app.get('/flights', function(req, res) {

  var departureDate = new Date(req.query.date);
  var arrivalDate = new Date(req.query.date);
  departureDate.setHours(6);
  arrivalDate.setHours(10);
  arrivalDate.setMinutes(15);
  var flights = [];
  const uuidv4 = require('uuid/v4');
  var numberOfFlightsReturn = Math.floor(Math.random() * 4) + 1;

  for (var i = 0; i < numberOfFlightsReturn; i++) {

    departureDate.setHours(departureDate.getHours() + 1);
    arrivalDate.setHours(arrivalDate.getHours() + 1);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + 5);
    var flight = {
      arrivalAirportCode: req.query.arrivalAirportCode,
      arrivalAirportName: req.query.arrivalAirportName,
      arrivalCity: req.query.arrivalCity,
      arrivalDate: arrivalDate,
      arrivalLocale: "Europe/Madrid",
      departureAirportCode: req.query.departureAirportCode,
      departureAirportName: req.query.departureAirportName,
      departureCity: req.query.departureCity,
      departureDate: departureDate,
      departureLocale: "Europe/London",
      flightNumber: 1810 + i,
      id: uuidv4(),
      ticketCurrency: "USD",
      ticketPrice: Math.floor(Math.random() * (300 - 80 + 1) + 80)
    };
    flights.push(flight);
  }
  res.json({
    flights
  });
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
