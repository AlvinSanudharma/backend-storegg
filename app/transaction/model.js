const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName: {
            type: String,
            require: [true, 'Nama Game Harus Di isi!']
        },
        category: {
            type: String,
            require: [true, 'Category Game Harus Di isi!']
        },
        thumbnail: {
            type: String,
        },
        coinName: {
            type: String,
            require: [true, 'Coin Name Harus Di isi!']
        },
        coinQuantity: {
            type: Number,
        },
    },
    historyPayment: {
        name: {
            type: String,
            require: [true, 'Name Harus Di isi!']
        },
        type: {
            type: String,
            require: [true, 'Type Harus Di isi!']
        },
        bankName: {
            type: String,
            require: [true, 'Bank Name Harus Di isi!']
        },
        noRekening: {
            type: String,
            require: [true, 'Nomor Rekening Harus Di isi!']
        },
    },
    name: {
        type: String,
        require: [true, 'Name harus di isi!'],
        maxLength: [225, 'Panjang maksimal adalah 225!'],
        minLength: [3, 'Panjang maksimal adalah 225!'],
    },
    accountUser: {
        type: String,
        require: [true, 'Account Name harus di isi!'],
        maxLength: [225, 'Panjang maksimal adalah 225!'],
        minLength: [3, 'Panjang maksimal adalah 225!'],
    },
    tax: {
        type: Number,
        default: 0
    },
    value: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },    
    historyUser: {
        name: {
            type: String,
            require: [true, 'Nama User Harus Di isi!']
        },
        phoneNumber: {
            type: Number,
            require: [true, 'Account Name harus di isi!'],
            maxLength: [13, 'Panjang maksimal adalah 225!'],
            minLength: [9, 'Panjang maksimal adalah 225!'],
        }
    },    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },  
}, {timestamp: true});

module.exports = mongoose.model('Transaction', transactionSchema);