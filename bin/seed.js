const mongoose = require('mongoose');
const userModel = require('../models/user');
const transactionModel = require('../models/transaction');
const bookModel = require('../models/book');


mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const seed = [];

userModel.create(seed)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));

transactionModel.create(seed)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));

bookModel.create(seed)
  .then(data => console.log('Data added', data))
  .then(() => mongoose.connection.close())
  .catch(error => console.log('Couldn\'t add files', error));
  