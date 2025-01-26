const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require("passport");
const path = require('path');
const fs = require('fs');
require("./config/passport")(passport);
require('dotenv/config');

const app = express(); 
const env = process.env;
const API = env.API_URL;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads directory');
}

// Middleware
app.use(bodyParser.json());

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// Routes
app.use(passport.initialize());
app.use(`${API}/`,authRouter);
app.use(`${API}/`,userRouter);
app.use('/public',express.static(__dirname + '/public'));

const hostname = env.HOST;
const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_URL).then(
    () => {
        console.log('Connected to Database')
    } 
).catch((error) =>{
    console.error(error)
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})
