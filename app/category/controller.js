const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus
      }

      const category = await Category.find();
      res.render("admin/category/view_category", {
        category,
        alert,
        title: 'Halaman Category',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/category");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        title: 'Halaman Tambah Category',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/category");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name} = req.body;
      let category = new Category({name});
      await category.save();

      req.flash('alertMessage', "Berhasil tambah data");
      req.flash('alertStatus', "success");

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      let category = await Category.findOne({_id: id}).exec();

      res.render("admin/category/edit", {category,         title: 'Halaman Ubah Category',
      name: req.session.user.name,});
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/category");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {name} = req.body;
      await Category.findOneAndUpdate({_id: id}, {name});

      req.flash('alertMessage', "Berhasil ubah data");
      req.flash('alertStatus', "success");

      res.redirect("/category");

    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/category");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;
      await Category.findOneAndRemove({_id: id});

      req.flash('alertMessage', "Berhasil hapus data");
      req.flash('alertStatus', "success");

      res.redirect("/category");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/category");
    }
  }
};
