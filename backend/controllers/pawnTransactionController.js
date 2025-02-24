const PawnTransaction = require('../models/PawnTransaction');

exports.getAllPawnTransactions = async (req, res) => {
  try {
    const transactions = await PawnTransaction.find()
      .populate('itemCategory', 'categoryName')
      .populate('client', 'firstName lastName');
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createPawnTransaction = async (req, res) => {
  try {
    const {
      itemCategory,
      client,
      itemDescription,
      pawnDate,
      returnDate,
      amount,
      commission,
    } = req.body;

    if (!itemCategory || !client || !itemDescription || !pawnDate || !amount || !commission) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTransaction = new PawnTransaction({
      itemCategory,
      client,
      itemDescription,
      pawnDate,
      returnDate,
      amount,
      commission,
      priceHistory: [{ price: amount, date: new Date() }],
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPawnTransactionById = async (req, res) => {
  try {
    const transaction = await PawnTransaction.findById(req.params.id)
      .populate('itemCategory', 'categoryName')
      .populate('client', 'firstName lastName');

    if (!transaction) {
      return res.status(404).json({ message: 'Pawn transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePawnTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemCategory,
      client,
      itemDescription,
      pawnDate,
      returnDate,
      amount,
      commission,
      priceHistory,
    } = req.body;

    const transaction = await PawnTransaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Pawn transaction not found' });
    }

    if (itemCategory) transaction.itemCategory = itemCategory;
    if (client) transaction.client = client;
    if (itemDescription) transaction.itemDescription = itemDescription;
    if (pawnDate) transaction.pawnDate = pawnDate;
    if (returnDate) transaction.returnDate = returnDate;
    if (amount) {
      transaction.amount = amount;
      transaction.priceHistory.push({ price: amount, date: new Date() });
    }
    if (commission) transaction.commission = commission;
    if (priceHistory) transaction.priceHistory = priceHistory;

    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePawnTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await PawnTransaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Pawn transaction not found' });
    }

    res.status(200).json({ message: 'Pawn transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};