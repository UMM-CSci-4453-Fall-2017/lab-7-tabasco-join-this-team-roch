Promise=require('bluebird')
mysql=require('mysql');
dbf=require('./dbf-setup.js');
var credentials = require('./credentials.json');

var express=require('express'),
app = express(),
port = process.env.PORT || 1337;

var buttons = [];

//This function is responsible for sending a query to the database and receive all the data from credentials.user.till_buttons,
//queryResults is all the entry from the table. 
var getButtonsInfo = function(){
  var sql = "SELECT * FROM " + credentials.user + ".till_buttons";
  return dbf.query(mysql.format(sql));
}

//This function is responsible for filling in the result from the above function, and populate the map buttons. It returns buttons.
var fillInButtonsArray = function(result){
  buttons = result;
  return(buttons);
}


//This is implemented so that the functions are executed in order. Each method is returning a Promise which makes sure it finishes first
//before starting another. 
dbf=getButtonsInfo()
.then(fillInButtonsArray)
.then(dbf.releaseDBF);

//This is sending the buttons map response back to the client
app.use(express.static(__dirname + '/public')); //Serves the web pages
app.get("/buttons",function(req,res){ // handles the /buttons API
  	res.send(buttons);
});
app.listen(port);
