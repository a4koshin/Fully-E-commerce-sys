const express=require('express')
const { createLocation, getAllLocation } = require('../controller/setup/setup')

const router=express.Router()

router.post('/',createLocation)

router.get('/',getAllLocation)

module.exports=router