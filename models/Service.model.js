const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const serviceSchema = new Schema({
    image: {
        type: String
    },
    serviceType: {
        type: String
    },
    additionalInfo: {
        type: String
    },
    time: {
        type: String
    },
    price: { 
        type: String,
    },   
}, {
    timestamps: true
})

const Service = model('Service', serviceSchema);
module.exports = Service;