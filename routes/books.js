const express = require('express');

const router = express.Router();
const Book = require('../models/book');

// GET Get list of books

router.get('/', (req, res) => {
  Book.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error,
      });
    });
});

// POST Create new book

router.post('/book', (req, res) => {
  const { info, clue, coordinates } = req.body;
  Book.create({
    info,
    clue,
    coordinates,
  }).then((newBook) => {
    res.status(200);
    res.json({
      status: 'created',
      response: newBook,
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      error,
    });
  });
});

// PUT Modify existing book (strike)

router.put('/book/:id', (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      if (book.strikes < 2) {
        book.strikes += 1;
      } else {
        boook.strikes += 1;
        book.hidden = true;
      }
      return book.save();
    }).then((updatedBook) => {
      res.status(200);
      res.json({
        status: 'updated',
        response: updatedBook,
      });
    }).catch((error) => {
      res.status(500);
      res.json({
        error,
      });
    });
});

module.exports = router;
