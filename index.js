//nodemon src/app.js
//nodemon src/app.js -e js,hbs to reflect changes
require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs= require('hbs');
const { partials } = require('handlebars');
const request = require('request');
const bodyparser= require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

//middleware for body parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())



// public static path
 
const static_path = path.join(__dirname,"./public");
const template_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");

app.use(express.static(static_path));

//view engine
app.set('view engine','hbs');
//changing views folder path here
app.set('views', template_path)

hbs.registerPartials(partials_path);
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

const key= process.env.API_KEY;
let URL    = 'http://api.openweathermap.org/data/2.5/weather?q='
let units  = '&units=metric'; 


//by default index.html in public folder, if using html
app.get('', (req,res) => {
     res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/weather', (req,res) => {
    res.render('weather' , {obj :false, emptyErr:false, invalidCity:false});
});

//this is for error page
app.get('*', (req,res) => {
    res.render('404error' ,{errmsg: 'Oops! Page not found'});
});

var city;

app.post('/weather', function(req, res, next){
    if(req.body.readcity === '')
        return res.render('weather', {obj :false, emptyErr:true, invalidCity:false});
    city = req.body.readcity;
    url = URL+city+"&"+units+"&appid="+`${key}`;
    request(url, function (error, response, obj) {
        
        if(error || response.statusCode != 200){
            return res.render('weather', {obj :false, emptyErr:false, invalidCity:true});
        }
        obj = JSON.parse(obj);
      res.render('weather', {obj : obj,emptyErr:false, invalidCity:false});
     });
});


app.listen(port , () => {
    console.log(`running at port ${port}`);
});

module.exports =key;