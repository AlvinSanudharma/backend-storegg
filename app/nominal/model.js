const mongoose = require("mongoose");
const nominalSchema = mongoose.Schema({
    coinQuantity: {
        type: Number,
        defaul: 0,
    },
    coinName: {
        type: String,
        require: [true, 'Nama coin harus di isi!']
    },
    coinPrice: {
        type: Number,
        default: 0
    }
}, {timestamp: true});

module.exports = mongoose.model('Nominal', nominalSchema);