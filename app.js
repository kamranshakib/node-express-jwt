const express = require('express');

import User from'./Model/user.js'

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.listen(3000,()=>{
  console.log('localhost 3000')
})