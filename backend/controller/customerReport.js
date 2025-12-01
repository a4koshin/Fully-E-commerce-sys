const asyncHandler = require("express-async-handler");
const Customer = require("../models/customer")


// report between two dates
const customerReportTwoDate = asyncHandler(async (req, res) => {
    try {

        // this report two dates between the start and end
            const customers = await Customer.find(
                  { createdAt: {
                    $gte: req.query.start,
                    $lt: req.query.end
                  }}
                ).sort({createdAt: -1});

                res.status(200).json(customers);
                  
      } catch (err) {
            res.status(500).json(err.message);
      }
})

// report with name
const customerReport = asyncHandler(async (req, res) => {
    try {

      const query = {
            createdAt: {
              $gte: req.query.start,
              $lt: req.query.end
            }
          };
        
          if (req.query.name) {
            query.name = req.query.name;
          }

            const customers = await Customer.find(query).sort({createdAt: -1});
            res.status(200).json(customers);
                  
      } catch (err) {
            res.status(500).json(err.message);
      }
})



module.exports = {
    customerReportTwoDate,
    customerReport
}