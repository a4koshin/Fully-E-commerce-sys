const asyncHandler = require("express-async-handler");
const { Hospital } = require("../models/hospital");
const { User } = require("../models/user");


const checkUserHospital =asyncHandler( async(userId) =>{
    
    try {
        console.log(userId)
        const user = await User.findById(userId);
        console.log(user)
        // const headerRpt = await HeaderRpt.find();
    
        // const headerData = headerRpt.map((header) => header.hospitalId);
    
        // if (
        //   headerData
        //     .map((objId) => objId.toString())
        //     .includes(req.user.hospitalId.toString())
        // ) {
        //   const headerRpt = await HeaderRpt.find({
        //     hospitalId: req.user.hospitalId,
        //   });
        //   res.status(200).json(headerRpt);
        // } else {
        //   res.status(500).json({ msg: "No report header found" });
        // }
      } catch (error) {
        res.status(500).json(error.message);
      }

});

module.exports = {
    checkUserHospital
}