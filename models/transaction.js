const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  bookTitle: String,
  bookId: {
    type: String,
    required: true,
  },
  userThatFrees: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  story: String,
  userThatHunts: String,
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
