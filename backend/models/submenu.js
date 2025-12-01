const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


mongoose.plugin(slug);


const SubMenuSchema = new mongoose.Schema({
    sub_title:{
        type:String,
    },
    sub_slug: {
        type: String, 
        slug: "sub_title"
    },
    sub_url:{
        type:String,
    },
    sub_priority:{
        type: Number
    },

    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Menu'
    },
    Status: {
        type: String,
        enum: [0,1,2],
        default: 0
    },
    Deleted: {
        type: String,
        enum: [0,1],
        default: 0
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Provider'
    }
},

{ timestamps: true }

);


const subMenu = mongoose.model("SubMenu", SubMenuSchema);


module.exports = { SubMenu: subMenu};