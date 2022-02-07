const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const Payment = require('../payment/model');
const Bank = require('../bank/model');

module.exports = {
    landingPage: async (req, res) => {
        try {
            const voucher = await Voucher.find()
            .select('_id name status category thumbnail')
            .populate('category');
            
            res.status(200).json({data: voucher})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal Server Error!'});
        }
    },
    detailPage: async (req, res) => {
        try {
            const {id} = req.params; 
            const voucher = await Voucher.findOne({_id: id})
            .populate('category')
            .populate('nominals')
            .populate('user', '_id name phoneNumber');
            
            if (!voucher) {
                return res.status(404).json({message: 'Voucher Not Found !'})
            }

            res.status(200).json({data: voucher})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal Server Error!'});
        }
    },
    category: async (req, res) => {
        try {
            const category = await Category.find();

            res.status(200).json({
                data: category
            })
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal Server Error!'});
        }
    },
    checkout: async (req, res) => {
        try {
            const {accountUser, name, nominal, voucher, payment, bank} = req.body;
            
            const res_voucher = await Voucher.findOne({_id: voucher})
                .select('name category _id thumbnail user')
                .populate('category')
                .populate('user');
            if(!res_voucher) return res.status(404).json({message: 'Voucher Not Found!'})

            const res_nominal = await Nominal.findOne({_id: nominal})
            if(!res_nominal) return res.status(404).json({message: 'Nominal Not Found!'})

            const res_payment = await Payment.findOne({_id: payment})
            if(!res_payment) return res.status(404).json({message: 'Payment Not Found!'})

            const res_bank = await Bank.findOne({_id: bank})
            if(!res_bank) return res.status(404).json({message: 'Bank Not Found!'})
        } catch (error) {
            res.status(500).json({message: error.message || 'Internal Server Error!'});
        }
    }
}
