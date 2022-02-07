const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10;

const playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus di isi!']
    },
    name: {
        type: String,
        require: [true, 'Nama harus di isi!'],
        maxLength: [225, 'Panjang maksimal adalah 225!'],
        minLength: [3, 'Panjang minimal adalah 3!'],
    },
    username: {
        type: String,
        require: [true, 'Nama harus di isi!'],
        maxLength: [225, 'Panjang maksimal adalah 225!'],
        minLength: [3, 'Panjang minimal adalah 3!'],
    },
    password: {
        type: String,
        require: [true, 'Password harus di isi!'],
        maxLength: [225, 'Panjang maksimal adalah 225!'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: {
        type: String,

    },
    fileName: {
        type: String
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor Telepon harus di isi!'],
        maxLength: [13, 'Panjang maksimal adalah 13!'],
        minLength: [9, 'Panjang minimal adalah 9!'],
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamp: true});

playerSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('Player').countDocuments({email: value})

        return !count
    } catch (error) {
        throw error
    }
}, attr => `${attr.value} sudah terdaftar!`);

playerSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
})

module.exports = mongoose.model('Player', playerSchema);