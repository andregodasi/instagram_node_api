const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  'insert_url_conect_mongo_db',
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
);
app.use(require('./routes'));

const dirUpload = path.resolve(__dirname, '..', 'uploads');
const dirUploadsResized = path.resolve(__dirname, '..', 'uploads',  'resized');
if (!fs.existsSync(dirUpload) || !fs.existsSync(dirUploadsResized)) {
  fs.mkdirSync(dirUploadsResized);
}

server.listen(3333);
