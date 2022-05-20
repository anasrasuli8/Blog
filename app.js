const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
// express app
const app = express();


const dbURI = 'sample-url';
mongoose.connect(dbURI)
.then(() => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set('view engine','ejs');

// changing folder for views
// app.set('views','somefolder')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

// home page
app.get('/',(req,res) => {
    res.redirect('/blogs')
});

// about Page
app.get('/about',(req,res) => {
    res.render('about',{title: 'About'});
});

app.use('/blogs',blogRoutes);

// 404 Page
app.use((req,res) => {
    res.status(404).render('404',{title: 'Route Not Found'});
})