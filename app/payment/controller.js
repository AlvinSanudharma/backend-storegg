const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus
      }

      const payment = await Payment.find().populate('banks');
      // console.log(payment);
      res.render("admin/payment/view_payment", {
        payment,
        alert,
        title: 'Halaman Payment',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {
        const banks = await Bank.find()

      res.render("admin/payment/create", {
          banks,
          title: 'Halaman Tambah Payment',
          name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/payment");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {type, banks} = req.body;
    //   console.log(coinPrice)
      let payment = new Payment({type, banks});
      await payment.save();

      req.flash('alertMessage', "Berhasil tambah data");
      req.flash('alertStatus', "success");

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      let payment = await Payment.findOne({_id: id}).populate('banks').exec();
      let banks = await Bank.find();
        console.log(payment)
      res.render("admin/payment/edit", {payment, banks, 
        title: 'Halaman Edit Payment',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/payment");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {type, banks} = req.body;
      await Payment.findOneAndUpdate({_id: id}, {type, banks});

      req.flash('alertMessage', "Berhasil ubah data");
      req.flash('alertStatus', "success");

      res.redirect("/payment");

    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/payment");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;
      await Payment.findOneAndRemove({_id: id});

      req.flash('alertMessage', "Berhasil hapus data");
      req.flash('alertStatus', "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/payment");
    }
  }
};
