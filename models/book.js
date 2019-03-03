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
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  hidden: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
