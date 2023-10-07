const UsersModel = require("../models/Users")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

const authController = {
    register: async (req, res) => {
        /*try {
            if (!req.body) {
                res.status(400).send({ message: "Les données à enregistrer ne peuvent être vides " })
    
            }
            const user = await UsersModel.create(req.body);
    
            const restData = await user.save()
            res.status(200).send({
                message: "Enregistrement effectué avec succès !",
                user: restData
            })
        } catch (error) {
            res.status(500).send({
                message: error || "Une erreur s'est produite lors de l'enregistrement"
            })
        }*/

        if (!req.body) {
            res.status(400).send({ message: "Les données à enregistrer ne peuvent être vides " })
            return
        }

        const user = new UsersModel({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD).toString(),
        })

        //Save user dans la db
        await user.save(user).then(data => {
            res.send({
                message: "Enregistrement effectué avec succès !",
                users: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de l'enregistrement"
            });
        });
    },

    login: async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).send({ message: "Les données d'authentification ne peuvent être vides " })
                return
            }
            //Check if email send by user exist in db
           const user = await UsersModel.findOne({ email: req.body.email})
           
           !user && res.status(401).json("Email incorrect !")

           const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSWORD)
           const userPass = hashPassword.toString(CryptoJS.enc.Utf8)

           userPass !== req.body.password && res.status(401).json("Mot de passe incorrect !")

           //Gestion du token
           const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
           }, process.env.JWT_SECRET, { expiresIn: '3d' })

           //Recupérer toutes les données de l'utilisateur
           //const { password, ...others } = user;
           const { password, ...others } = user._doc;

           //res.status(200).send({ user: others , accessToken})
           res.status(200).send({ ...others , accessToken})


        } catch (error) {
            res.status(500).send({
                message: error || "Une erreur s'est produite lors de la connexion !"
            });
        }
    }
}

module.exports = authController
