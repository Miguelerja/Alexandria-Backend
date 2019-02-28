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
    required: true,
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
  historyCoordinates: Array,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;