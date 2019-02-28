const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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
  coordinates: {
    type: Array,
    required: true,
  },
  historyCoordinates: Array,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;