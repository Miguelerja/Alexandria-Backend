const express = require('express');

const router = express.Router();
const Book = require('../models/book');

// GET Get list of books

router.get('/', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    Book.find({ hidden: false })
      .then((books) => {
        res.status(200).json(books);
      })
      .catch((error) => {
        res.status(500);
        res.json({
          error,
        });
      });
  } else {
    const { clue } = req.query;
    Book.findOne(clue)
      .then((book) => {
        res.status(200).json(book);
      })
      .catch((error) => {
        res.status(500);
        res.json({
          error,
        });
      });
  }
});

// POST Create new book

router.post('/book', (req, res) => {
  const { info, clue, location } = req.body;
  const code = `Alexandria${location.coordinates[0]}${info.author}`;
  Book.create({
    code,
    info,
    clue,
    location,
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

// PUT Modify strikes

router.put('/book/:id', (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      if (book.strikes < 2) {
        book.strikes += 1;
      } else {
        book.strikes += 1;
        book.hidden = true;
        book.status = 'lost';
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

// PUT Capture book

router.put('/bookCode/:code', (req, res) => {
  const { code } = req.params;
  console.log(code);
  Book.findOne({ code })
    .then((book) => {
      book.hidden = true;
      book.status = 'captured';
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
