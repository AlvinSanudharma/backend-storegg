const Player = require('../player/model');
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {
    signup: async (req, res, next) => {
        try {
            const payload = req.body;

            if (req.file) {
                let tmpPath = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let fileName = req.file.filename + '.' + originalExt;
                let targetPath = path.resolve(config.rootPath, `public/uploads/${fileName}`);
        
                const src = fs.createReadStream(tmpPath);
                const dest = fs.createWriteStream(targetPath);
        
                src.pipe(dest);

                src.on('end', async () => {
                    try {
                    const player = new Player({
                        ...payload,
                        avatar: fileName
                    });
        
                    await player.save();

                    delete player._doc.password;

                    res.status(201).json({
                        data: player
                    })

                    } catch (error) {
                        if (error && error.name === "ValidationError") {
                            return res.status(422).json({
                                error: 1,
                                message: error.message,
                                fields: error.errors
                            })
                        }
                            next(error)
                    }
                })
            } else {
                let player = new Player(payload);

                await player.save();
                delete player._doc.password;

                res.status(201).json({
                    data: player
                })
            }
        } catch (error) {
            if (error && error.name === "ValidationError") {
                return res.status(422).json({
                    error: 1,
                    message: error.message,
                    fields: error.errors
                })
            }
                next(error)
        }
    },
    signin: (req, res, next) => {
        const {email, password} = req.body;

        Player.findOne({email: email}).then(player => {
            if (player) {
                const checkPassword = bcrypt.compareSync(password, player.password);

                if (checkPassword) {    
                    const token = jwt.sign({ player: {
                        id: player.id,
                        username: player.username,
                        email: player.email,
                        name: player.name,
                        phoneNumber: player.phoneNumber,
                        avatar: player.avatar
                     } 
                    }, config.jwtKey);

                    res.status(200).json({
                        data: {
                            token
                        }
                    })
                } else {
                    res.status(403).json({
                        message: "Password yang anda Salah!"
                    })
                }
            } else {
                res.status(403).json({
                    message: "Email yang anda masukan belum terdaftar!"
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: error.message || "Internal Server Error!"
            });

            next();
        })
    }
}