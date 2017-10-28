var express = require('express');
var parser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

const PORT=process.env.OPENSHIFT_NODEJS_PORT || 3000;
const IPADDRESS=process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var urlencodedParser = parser.urlencoded({ extended: false })

app.post('/calculateTax', urlencodedParser, function (req, res) {
  var amount = Number(req.body.amount);
  var rate = Number(req.body.rate);
  var tax = amount * (rate/100.00);
  res.render('taxCalc', {data: "The total amount is " + parseFloat(amount+tax).toFixed(2) + " " + req.body.currency});
});

app.get('/', function(req, res){
  res.render('taxCalc');
});

app.listen(PORT, IPADDRESS);
