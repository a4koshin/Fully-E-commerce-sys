const express = require("express");
const router = express.Router();
const {
    createOrderWithCoupon,
    UpdateOrder, 
    getOrderByUser,
    getOrders,
    getOrderById,
    getCustomerOrdersByEmail,
    getCustomerWithOrder,
    UpdateOrderByStatus,
    getOrderWithId
} = require("../controller/order");
const { userAuth } = require("../middlewares/authMiddleware");


//const { clientAuth } = require("../middlewares/authMiddleware");



// POST
router.post("/",userAuth,  createOrderWithCoupon);



// GET
router.get("/", getOrders);
router.get("/orders", userAuth, getOrderWithId);
//router.get("/:id",  getOrderById);
router.get("/client/:id", userAuth,  getOrderByUser);

router.get("/by-email",userAuth, getCustomerOrdersByEmail);
router.get("/customers-with-orders",userAuth, getCustomerWithOrder);
//PUT
router.put("/:id",userAuth, UpdateOrder);
router.put("/status/:id",userAuth, UpdateOrderByStatus);


//DELETE

module.exports = router;
