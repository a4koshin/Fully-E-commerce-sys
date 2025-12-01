const express = require('express')
const router = express.Router()
const {
    createCoupon,
    getAllCoupons,
    updateCoupon
} = require('../controller/coupon')




// POST
router.post('/', createCoupon)

// GET
router.get("/",  getAllCoupons);
// router.get("/item/:id", getItemById);
// router.get("/item/slug/:slug", getItemBySlug);

//PUT
router.put("/edit/:id", updateCoupon);
// router.put("/item/featured/:id", updateFeaturedStatus);


//DELETE
// router.put("/item/delete/:id", deleteItem);


module.exports = router
