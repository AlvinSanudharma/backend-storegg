const Bank = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus
      }

      const bank = await Bank.find();
    //   console.log(bank);
      res.render("admin/bank/view_bank", {
        bank,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/bank");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name, nameBank, nomorRekening} = req.body;
      let bank = new Bank({name, nameBank, nomorRekening});
    //   console.log(bank)
      await bank.save();

      req.flash('alertMessage', "Berhasil tambah data");
      req.flash('alertStatus', "success");

      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      let bank = await Bank.findOne({_id: id}).exec();
        console.log(bank)
      res.render("admin/bank/edit", {bank});
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/bank");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {name, nameBank, nomorRekening} = req.body;
      await Bank.findOneAndUpdate({_id: id}, {name, nameBank, nomorRekening});

      req.flash('alertMessage', "Berhasil ubah data");
      req.flash('alertStatus', "success");

      res.redirect("/bank");

    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/bank");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;
      await Bank.findOneAndRemove({_id: id});

      req.flash('alertMessage', "Berhasil hapus data");
      req.flash('alertStatus', "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/bank");
    }
  }
};
