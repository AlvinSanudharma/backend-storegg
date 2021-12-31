const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require("path");
const fs = require("fs");
const config = require("../../config") 

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus
      }

      const voucher = await Voucher.find().populate('category').populate('nominals');
      // console.log(voucher);
      res.render("admin/voucher/view_voucher", {
        voucher,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      // console.log(category);
      // console.log(nominal);
      res.render("admin/voucher/create", {
        category,
        nominal
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {name, category, nominals} = req.body;
      // console.log(req.file)
      if(req.file) {
        let tmpPath = req.file.path;
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let fileName = req.file.filename + '.' + originalExt;
        let targetPath = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: fileName
            });

            await voucher.save();

            req.flash('alertMessage', "Berhasil tambah data");
            req.flash('alertStatus', "success");

            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect("/voucher");
          }
        })
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });

        await voucher.save();

        req.flash('alertMessage', "Berhasil tambah data");
        req.flash('alertStatus', "success");

        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      let voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals').exec();
        // console.log(voucher)
      res.render("admin/voucher/edit", {voucher, category, nominal});
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const {name, category, nominals} = req.body;
      // console.log(req.file)
      if(req.file) {
        let tmpPath = req.file.path;
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let fileName = req.file.filename + '.' + originalExt;
        let targetPath = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const voucher = await Voucher.findOne({_id: id});
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

            if(fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Voucher.findOneAndUpdate({
              _id: id
            }, {
              name,
              category,
              nominals,
              thumbnail: fileName
            });

            req.flash('alertMessage', "Berhasil ubah data");
            req.flash('alertStatus', "success");

            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect("/voucher");
          }
        })
      } else {
        await Voucher.findOneAndUpdate({
          _id: id
        }, {
          name,
          category,
          nominals
        });

        req.flash('alertMessage', "Berhasil ubah data");
        req.flash('alertStatus', "success");

        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const {id} = req.params;
      const voucher = await Voucher.findOneAndRemove({_id: id});

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      console.log(currentImage)
      if(fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash('alertMessage', "Berhasil hapus data");
      req.flash('alertStatus', "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  },

  actionStatus: async(req, res) => {
    try {
      const {id} = req.params;
      let voucher = await Voucher.findOne({_id: id});

      let status = voucher.status === 'Y' ? 'N' : 'Y';

      voucher = await Voucher.findOneAndUpdate({
        _id: id
      }, {status});

      req.flash('alertMessage', "Berhasil ubah status");
      req.flash('alertStatus', "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/voucher");
    }
  }
};
