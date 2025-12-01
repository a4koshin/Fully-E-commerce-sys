const express=require('express')
const { createDriver, getAllDrivers, updateDriver } = require('../controller/driver')

const router=express.Router()

router.post('/',createDriver)
router.get('/',getAllDrivers)
router.put('/edit/:id',updateDriver)

module.exports=router