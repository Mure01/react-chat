const express = require('express')
const cors = require('cors')
const app = express();
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs')

app.use(require("body-parser").json());
app.use(cors())
app.use(express.json())
app.use("/image", express.static('uploads'))

var indexRouter = require('./routes/index')

app.use('/', indexRouter);

const filenames = fs.readdirSync('uploads')
app.use('/uploads', (req, res) => {
  res.send({filenames})
});


mongoose.connect(process.env.urlDb)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.listen(process.env.PORT, () => {
    console.log("Slusa na portu 5000")
});