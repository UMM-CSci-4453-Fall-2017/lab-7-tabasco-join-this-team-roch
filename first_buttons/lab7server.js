Promise=require('bluebird')
mysql=require('mysql');
DBF=require('./dbf-setup.js');
var credentials = require('./credentials.json');

var express=require('express'),
app = express(),
port = process.env.PORT || 1337;

var buttons = [];

var getButtonsInfo = function(){
  var sql = "SELECT * FROM " + "Andy.till_buttons";
  queryResults = DBF.query(mysql.format(sql));
  return(queryResults);
}

var fillInButtonsArray = function(result){
  buttons = result;
  return(buttons);
}

var dbf=getButtonsInfo()
.then(fillInButtonsArray)
.then(DBF.releaseDBF);
//var buttons=[{"buttonID":1,"left":10,"top":70,"width":100,"label":"hotdogs","invID":1},{"buttonID":2,"left":110,"top":70,"width":100,"label":"hambugers","invID":2},{"buttonID":3,"left":210,"top":70,"width":100,"label":"bannanas","invID":3},{"buttonID":4,"left":10,"top":120,"width":100,"label":"milkduds","invID":4}]; //static buttons

app.use(express.static(__dirname + '/public')); //Serves the web pages
app.get("/buttons",function(req,res){ // handles the /buttons API
  res.send(buttons);
});

app.listen(port);
