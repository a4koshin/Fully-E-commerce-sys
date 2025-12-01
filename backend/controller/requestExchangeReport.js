const asyncHandler = require("express-async-handler");
const RequestExchange = require("../models/requistExchange")


// report between two dates
const requestExchangeReportTwoDate = asyncHandler(async (req, res) => {
    try {

        // this report two dates between the start and end
            const requestExchange = await RequestExchange.find(
                  { createdAt: {
                    $gte: req.query.start,
                    $lt: req.query.end
                  }}
                ).sort({createdAt: -1});

                res.status(200).json(requestExchange);
                  
      } catch (err) {
            res.status(500).json(err.message);
      }
})

// report with customer
const requestExchangeReport = asyncHandler(async (req, res) => {
    try {

      const query = {
            createdAt: {
              $gte: req.query.start,
              $lt: req.query.end
            }
          };
        
          if (req.query.customer) {
            query.customer = req.query.customer;
          }

          if (req.query.currencyFrom) {
            query.currencyFrom = req.query.currencyFrom;
          }

          if (req.query.currencyTo) {
            query.currencyTo = req.query.currencyTo;
          }

          if (req.query.agentRef) {
            query.agentRef = req.query.agentRef;
          }

            const requestExchange = await RequestExchange.find(query).populate(['customer', 'currencyFrom', 'currencyTo', 'agentRef']).sort({createdAt: -1});
            res.status(200).json(requestExchange);
                  
      } catch (err) {
            res.status(500).json(err.message);
      }
})



module.exports = {
    requestExchangeReportTwoDate,
    requestExchangeReport
}