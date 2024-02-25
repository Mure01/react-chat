const express = require('express')
const cors = require('cors')
const app = express();
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs')
const {Server} = require('socket.io')

app.use(require("body-parser").json());
app.use(cors())
app.use(express.json())
app.use("/image", express.static('uploads'))

var indexRouter = require('./routes/index');
const messageModel = require('./Models/messageModel');

app.use('/', indexRouter);

const filenames = fs.readdirSync('uploads')
app.use('/uploads', (req, res) => {
  res.send({filenames})
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_LINK  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

mongoose.connect(process.env.urlDb)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const server = app.listen(process.env.PORT, () => {
    console.log("Slusa na portu 5000")
});
const io = new Server(server, {
    cors:{
      origin:process.env.CLIENT_LINK,
      methods:['GET', 'POST']
    }
})

io.on('connection', (socket) => {
  console.log("User connected", socket.id)

  socket.on('sendMessage', async (mess) => {
    const allMessage = await messageModel.find()
    socket.broadcast.emit( 'getMessage', allMessage) //slanja poruke svim klijentima osim onoga koje je poslalo
  })

  socket.on('disconnect', () => {
    console.log("User disconnected", socket.id)
  })

})