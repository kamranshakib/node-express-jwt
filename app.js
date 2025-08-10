import express from 'express'

import User from'./Model/user.js'

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

const user = {
  email:'kamranshakib@gmail.com',
  password: 'kamranshakib'
}
User.create(user)
.then((result) => {
  console.log('save to DB')
  
}).catch((err) => {
  console.log(err.message)
});





app.listen(3000,()=>{
  console.log('localhost 3000')
})