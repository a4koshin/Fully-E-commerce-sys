const Location = require("../models/location");
const Currency = require("../models/currency")
const Agent = require("../models/agent")
const Account = require("../models/account")
const Transactions = require("../models/transactions")
const asyncHandler = require("express-async-handler");



// Create Deposit
const createDebit = asyncHandler(async (req, res) => {
    const { amount, location, currency, desc} = req.body;

    try {

      const agentId = req.body.agent;
      const locationId = req.body.location;
      const currencyId = req.body.currency;

      if (!locationId) {
        return res.status(400).json({ msg: 'Location is missing' });
      }

      if (!agentId) {
        return res.status(400).json({ msg: 'Agent is missing' });
      }

      

      if (!currencyId) {
        return res.status(400).json({ msg: 'Currency is missing' });
      }

        const agent = await Agent.findById(agentId)
        if(!agent)return res.status(404).json({msg: 'invalid agent'});

        // return res.status(404).json({ msg: "agent Not Found" });

        const currency = await Currency.findById(currencyId);
        if(!currency)return res.status(404).json({msg: 'invalid currency'});

        const location = await Location.findById(locationId);
        if(!location)return res.status(404).json({msg: 'invalid location'});

        const accountId = agent.account;
        const account = await Account.findById(accountId);

        if (isNaN(amount)) {
            return res.status(400).json({ msg: 'Invalid amount' });
          }


        if(!accountId)return res.status(404).json({msg: 'invalid Account Id'});

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            { 
            blance: account.blance + amount,
         },
            { new: true }
          );

          const transaction = new Transactions({
            type:"debit",
            location: location,
            currency:currency,
            amount:amount,
            desc:desc,
            account:accountId,
            balance: updatedAccount?.blance,
            agent:agent,
            user:req.user.id
          });
      
          await transaction.save();

        res.status(201).json({ msg: 'Success Saved'});
        
    } catch (error) {
       
          console.log(error)
        res.status(500).json(error);
    }


})

// create withdraw
const createWithdraw = asyncHandler(async (req, res) => {
    const { amount, location, currency, desc} = req.body;

    try {

      const agentId = req.body.agent;
      const locationId = req.body.location;
      const currencyId = req.body.currency;

      if (!locationId) {
        return res.status(400).json({ msg: 'Location is missing' });
      }

      if (!agentId) {
        return res.status(400).json({ msg: 'Agent is missing' });
      }

      

      if (!currencyId) {
        return res.status(400).json({ msg: 'Currency is missing' });
      }

        const agent = await Agent.findById(agentId)
        if(!agent)return res.status(404).json({msg: 'invalid agent'});

        const currency = await Currency.findById(currencyId);
        if(!currency)return res.status(404).json({msg: 'invalid currency'});

        const location = await Location.findById(locationId);
        if(!location)return res.status(404).json( {msg: 'invalid location'});

        const accountId = agent.account;
        const account = await Account.findById(accountId);

        if (amount > account.blance) {
            return res.status(400).json({ msg: 'Insufficient balance' });
          }

          if (amount < 1) {
            return res.status(400).json({ msg: "Transfer amount must be at least 1" });
          }

          if (isNaN(amount)) {
            return res.status(400).json({ msg: 'Invalid amount' });
          }

        if(!accountId)return res.status(404).json({msg: 'invalid Account Id'});

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            { 
            blance: account.blance - amount,
         },
            { new: true }
          );


          const transaction = new Transactions({
            type:"credit",
            location: location,
            currency:currency,
            amount:amount,
            desc:desc,
            balance: updatedAccount?.blance,
            account:accountId,
            agent:agent,
            user:req.user.id
          });
      
          await transaction.save();

          res.status(201).json({ msg: 'Success Saved'});
        
    } catch (error) {
        if (error.kind == "ObjectId") {
            return res.status(404).json({ msg: "Cuontry Not Found" });
          }
          console.log(error)
        res.status(500).json(error);
    }


})

// get deposit transaction
const getDepositTransaction = asyncHandler(async (req, res) => {

    try {
        const transactions = await Transactions.find({type: 'debit'}).populate(['account', 'location', 'currency', 'user']).populate({path : 'agent', populate: {path: 'agentType'}}).sort("-createdAt");
   
          res.status(200).json(transactions);
        
    } catch (error) {
        res.status(500).json(error.msg);
    }


})

//withdraw transaction
const getWithdrawTransaction = asyncHandler(async (req, res) => {

    try {
        const transactions = await Transactions.find({type: 'credit'}).populate(['account', 'location', 'currency', 'user']).populate({path : 'agent', populate: {path: 'agentType'}}).sort("-createdAt");
        
          res.status(200).json(transactions);
        
    } catch (error) {
        res.status(500).json(error.msg);
    }


})


module.exports = {
    createDebit,
    createWithdraw,
    getDepositTransaction,
    getWithdrawTransaction
}