const mongoose = require('mongoose');


const tokenSchema = mongoose.Schema({
    email: {
        type: String
    },
    token:{
        type: String
    },
    createdAt:{
        type: Date
    },
    expiresAt:{
        type: Date
    },

})


const Token = mongoose.model('Token', tokenSchema)

module.exports = Token