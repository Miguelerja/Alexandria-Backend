const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  code: {
    type: String,
    unique: true,
  },
  info: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: 'free',
  },
  clue: {
    type: String,
    required: true,
  },
  strikes: {
    type: Number,
    default: 0,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  historyCoordinates: Array,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
