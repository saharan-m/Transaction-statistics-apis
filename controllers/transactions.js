import User from "../models/user.js";
import Transaction from "../models/transaction.js";

export const createTransaction = async (req, res) => {
  if (!req.userId) return res.json({ message: "UnAuthorized" });
  const transaction = req.body;

  const newTransaction = new Transaction(transaction);
  try {
    const currentUser = await User.findById(req.userId);
    if (
      newTransaction.status === "DEBIT" &&
      currentUser.net_balance < newTransaction.amount
    ) {
      return res
        .status(400)
        .json({ message: "Not enough balance in the account!" });
    }
    await newTransaction.save();
    if (newTransaction.status === "COMPLETED") {
      if (newTransaction.type === "CREDIT") {
        currentUser.net_balance =
          currentUser.net_balance + newTransaction.amount;
        currentUser.amount_credited =
          currentUser.amount_credited + newTransaction.amount;
      } else {
        currentUser.net_balance =
          currentUser.net_balance - newTransaction.amount;
        currentUser.amount_debited =
          currentUser.amount_debited + newTransaction.amount;
      }
    }

    await User.findByIdAndUpdate(req.userId, currentUser);
    res.status(200).json({ message: "Transaction Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  if (!req.userId) return res.json({ message: "Unauthorized" });
  const transaction = req.body;
  const updatedTransaction = new Transaction(transaction);
  const existingTransaction = await Transaction.findOne({
    username: transaction.username,
    timestamp: transaction.timestamp,
  });
  if (existingTransaction.status === "COMPLETED")
    return res
      .status(400)
      .json({ message: "Cannot update a completed transaction" });
  const currentUser = await User.findById(req.userId);

  await updatedTransaction.save();

  if (updatedTransaction.type === "CREDIT") {
    currentUser.net_balance =
      currentUser.net_balance + updatedTransaction.amount;
    currentUser.amount_credited =
      currentUser.amount_credited + updatedTransaction.amount;
  } else {
    currentUser.net_balance =
      currentUser.net_balance - updatedTransaction.amount;
    currentUser.amount_debited =
      currentUser.amount_debited + updatedTransaction.amount;
  }
  await User.findByIdAndUpdate(req.userId, currentUser);

  await Transaction.findOneAndUpdate(
    {
      username: updatedTransaction.username,
      timestamp: updatedTransaction.timestamp,
    },
    { status: "COMPLETED" }
  );
  res.status(200).json({ message: "Successfully updated Status!" });
};
