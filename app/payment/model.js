const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
    type: {
        type: String,
        require: [true, 'Type Pembayaran harus di isi!']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    banks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    }]
});

module.exports = mongoose.model('Payment', paymentSchema);