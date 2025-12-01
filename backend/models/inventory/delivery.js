const mongoose =require('mongoose')
const deliverySchema=mongoose.Schema({
    delId:String,
    ordId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    address:String,
    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Driver'
    },
    priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
   default: 'medium'
  },
  distance:String,
  value:Number,
 status:{
        type:String,
        enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
        default: 'pending'
    },
    estimatedTime:String


},{timestamps:true})

module.exports=mongoose.model('Delivery',deliverySchema)