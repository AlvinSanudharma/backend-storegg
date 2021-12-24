const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama kategori harus di isi!']
    }
});

module.exports = mongoose.model('Category', categorySchema);