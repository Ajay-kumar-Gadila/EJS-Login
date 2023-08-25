const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const User = require('./userModel');

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:1234@cluster0.nv0hpjx.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Define routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, email , mobile, password } = req.body;

  const user = await User.create({ name: username, email , mobile, password });

  if (user) {
    // res.send("login successfull");
    res.render('home');
  } else {
      res.status(401).send('Invalid username or password');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port 3000`);
});
