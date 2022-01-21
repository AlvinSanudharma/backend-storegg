const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama kategori harus di isi!']
    }
}, {timestamp: true});

module.exports = mongoose.model('Category', categorySchema);