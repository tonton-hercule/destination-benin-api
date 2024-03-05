const UsersModel = require("../models/Users")
//const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require('crypto'); //Bibliothèque de nodeJs
const nodemailer = require('nodemailer');
const mails = require("../config/mails");
const Mailgen = require("mailgen");
//const { createTransport } = require('nodemailer');
const fs = require('fs')
const path = require('path')


const authController = {
    register: async (req, res) => {

        /**INFORMATION
         * bcrypt est spécialement conçu pour le hachage des password 
         * contrairement à CryptoJs qui est utilisé pour le chiffrement et ne dispose pas des même mécanismes que bcrypt
         */

        if (!req.body) {
            res.status(400).send({ message: "Les données à enregistrer ne peuvent être vides " })
            return
        }


        // Générer le timestamp actuel en secondes
        const timestamp = Math.floor(Date.now() / 1000);
        // Générer le hash SHA-1 en utilisant le timestamp comme données d'entrée
        const code_email = crypto.createHash('sha1').update(timestamp.toString()).digest('hex');

        const user = new UsersModel({
            nom: req.body.nom,
            prenoms: req.body.prenoms,
            telephone: req.body.telephone,
            email: req.body.email,
            roleId: req.body.roleId,
            fullname: req.body.prenoms + ' ' + req.body.nom,
            raison_sociale: req.body.raison_sociale,
            profilId: req.body.profilId,
            paysId: req.body.paysId,
            code_email: code_email,
            /**PREMIERE METHODE DE CRYPTAGE DU PASSWORD */
            //password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD).toString(),
            /**DEUXIEME  METHODE DE CRYPTAGE DU PASSWORD*/
            password: bcrypt.hashSync(req.body.password, 8)
        })

        const contenu = {
            profil: user.libelle_profil,
            email: req.body.email,
            password: req.body.password,
            code_activation: code_email,
            subject: "BIBLIOTHEQUE NUMERIQUE EPA - CREATION DE COMPTE"
        }

        
        const transporter = nodemailer.createTransport(mails);
        
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: contenu.email,
            subject: contenu.subject,
            html: `<h1>Test mail avec le framework Express.js</h1>`
        };

        fs.readFile(path.join(__dirname, '../emails/email_new_compte.html'), 'utf-8', (err, html) => {
            if (err) {
                console.log(err)
            }else{
                html = html.replace('{{profil}}', contenu.profil).replace('{{code_activation}}', contenu.code_activation).replace('{{email}}', contenu.email).replace('{{mot_de_passe}}', contenu.password);
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });  
            }
        })
        
              

        //Save user dans la db
        await user.save(user).then(data => {
            res.status(200).send({
                message: "Enregistrement effectué avec succès !",
                users: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de l'enregistrement"
            });
        });
    },


    //Login function
    login: async (req, res) => {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(400).send({ message: "Les données d'authentification ne peuvent être vides " })
                return
            }
            //Check if email send by user exist in db && get son role
            const user = await UsersModel.findOne({ email: req.body.email }).populate('roleId')
            if (!user) {
                res.status(401).json({ message: "Email incorrect !" })
                return
            }

            /**PREMIERE METHODE DE DECRYPTAGE DU PASSWORD */
            //const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSWORD)
            //const userPass = hashPassword.toString(CryptoJS.enc.Utf8)
            //userPass !== req.body.password && res.status(401).json("Mot de passe incorrect !")
            /**END PREMIERE METHODE DE DECRYPTAGE DU PASSWORD */

            /**DEUXIEME  METHODE DE DECRYPTAGE DU PASSWORD*/
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordIsValid) {
                res.status(401).json({ message: "Mot de passe incorrect !" })
                return
            }
            /**END DEUXIEME  METHODE DE DECRYPTAGE DU PASSWORD*/

            //Gestion du token
            const accessToken = jwt.sign({
                id: user._id,
                nom: user.nom
            }, process.env.JWT_SECRET, {
                expiresIn: 86400, // 24 heures ou '1d'
            })

            //Recupérer toutes les données de l'utilisateur
            //const { password, ...others } = user;
            const { password, ...others } = user._doc;

            //res.status(200).send({ user: others , accessToken})
            res.status(200).send({ ...others, accessToken })


        } catch (error) {
            res.status(500).send({
                message: error || "Une erreur s'est produite lors de la connexion !"
            });
            //return
        }
    }
}

module.exports = authController
