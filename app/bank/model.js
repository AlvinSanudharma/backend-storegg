const mongoose = require("mongoose");
const bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama Pemilik harus di isi!']
    },
    nameBank: {
        type: String,
        require: [true, 'Nama Bank harus di isi!']
    },
    nomorRekening: {
        type: String,
        require: [true, 'Nomor Rekening harus di isi!']
    },
}, {timestamp: true});

module.exports = mongoose.model('Bank', bankSchema);