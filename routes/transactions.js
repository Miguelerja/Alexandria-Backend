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
  }
});

// POST Create new transaction

router.post('/new', (req, res) => {
  const { bookId, userThatFrees, location, story } = req.body;
  Transaction.create({
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
  console.log('this is bookcode', bookId);
  console.log('hunter', userThatHunts)
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
