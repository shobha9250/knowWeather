//nodemon src/app.js
//nodemon src/app.js -e js,hbs to reflect changes

const express = require('express');
const path = require('path');
const hbs= require('hbs');
const { partials } = require('handlebars');

const app = express();
const port = process.env.PORT || 3000;



// public static path
 
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

//view engine
app.set('view engine','hbs');
//changing views folder path here
app.set('views', template_path)

hbs.registerPartials(partials_path);

app.use(express.static(static_path));


//by default index.html in public folder, if using html
app.get('', (req,res) => {
     res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/weather', (req,res) => {
    res.render('weather');
});

//this is for error page
app.get('*', (req,res) => {
    res.render('404error' ,{errmsg: 'Oops! Page not found'});
});

app.listen(port , () => {
    console.log(`running at port ${port}`);
});