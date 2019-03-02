const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transactionSchema = new Schema({
  bookId: {
    type: ObjectId,
    reference: 'book',
    required: true,
  },
  userThatFrees: {
    type: ObjectId,
    reference: 'user',
    required: true,
  },
  userThatHunts: {
    type: ObjectId,
    reference: 'user',
    required: true,
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
