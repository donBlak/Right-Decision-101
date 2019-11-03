const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bankSchema = new Schema({
    bankName:{
        type: String,
        required: false
    },
    bankId: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    interestRates: [
        {
            interestRateId: {
                type:String,
                required: false
            },
            term: {
                type: String,
                required: false
            },
            monthly: {
                type: Number,
                required: false
            },
            annualy: {
                type: Number,
                required: false
            },
            maturity: {
                type: Number,
                required: false
            },
            time: {
                type: Number,
                required: false
            }
        }
    ]
})

module.exports = mongoose.model('Bank', bankSchema)