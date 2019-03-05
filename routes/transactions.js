const express = require('express');

const router = express.Router();
const Transaction = require('../models/transaction');

// GET list of transactions

router.get('/', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    Transaction.find({})
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((error) => {
        res.status(500);
        res.json({
          error,
        });
      });
  } else {
    const { userThatHunts, bookId } = req.query;
    Transaction.find({ $or: [{ userThatHunts }, { bookId }] })
      .then((transactions) => {
        res.status(200).json(transactions);
      })
      .catch((error) => {
        res.status(500);
        res.json({
          error,
        });
      });
  }
});

// POST Create new transaction

router.post('/new', (req, res) => {
  const { bookTitle, bookId, userThatFrees, location, story } = req.body;
  Transaction.create({
    bookTitle,
    bookId,
    userThatFrees,
    location,
    story,
  }).then((newTransaction) => {
    res.status(200);
    res.json({
      status: 'created',
      response: newTransaction,
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      error,
    });
  });
});

// PUT update transaction

router.put('/:bookId', (req, res) => {
  const { bookId } = req.params;
  const { userThatHunts } = req.body;
  Transaction.findOne({ bookId })
    .then((transaction) => {
      transaction.userThatHunts = userThatHunts;
      return transaction.save();
    }).then((updatedTransaction) => {
      res.status(200);
      res.json({
        status: 'updated',
        response: updatedTransaction,
      });
    }).catch((error) => {
      res.status(500);
      res.json({
        error,
      });
    });
});


module.exports = router;
