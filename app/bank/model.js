const mongoose = require("mongoose");
const bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama Pemilik harus di isi!']
    },
    bankName: {
        type: String,
        require: [true, 'Nama Bank harus di isi!']
    },
    noRekening: {
        type: String,
        require: [true, 'Nomor Rekening harus di isi!']
    },
}, {timestamp: true});

module.exports = mongoose.model('Bank', bankSchema);