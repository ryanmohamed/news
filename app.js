//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('static'));
//use string folder name as static

app.use(bodyParser.urlencoded({extended: true}));

//home/root route request, respond with...
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/landing.html');
});

app.post('/', (req, res) => {
  let fName = req.body.fName;
  let lName = req.body.lName;
  let email = req.body.email;
  console.log(fName, lName, email);

  //form sends data to our server
    //request api

  var data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };

  var jsonString = JSON.stringify(data); //turn json to string

  var options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/8ede1a17aa',
    method: 'POST',
    headers: {
      "Authorization": "ryanmohamed aba4b4359ea4dbea0e5d8939acc69cd9-us3"
    },
    body: jsonString
  };

  //options is an object we define based on api
  request(options, (error, response, body) => {
    if(error){
      res.sendFile(__dirname + '/failure.html');
    } else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + '/success.html');
      } else {
        res.sendFile(__dirname + '/failure.html');
      } //end of if else 2
    } // end of if else 1
  });

});

//success route
app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/success.html');
});

//failure route
app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('Starting server on port 3000...');
});
