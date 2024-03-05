const ProduitsModel = require("../models/Produits")
//const uploadFile = require('../middleware/upload')
//const util = require("util");
//const multer = require("multer");
const path = require('path');
const fs = require('fs').promises;

const dataController = {
    /**Define all function of this controller */
    findAll: async (req, res) => {
        await ProduitsModel.find().populate("categorieId").then(data => {
            res.status(200).send({ produits: data })
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des données."
            });
        })
    },

    //Create function
    create: async (req, res) => {

        if (!req.body) {
            res.status(400).send({
                message: "Le titre est obligatoire !"
            });

            return;
        }

        // Récupérez l'extension du fichier
        // const fileExtension = path.extname(req.file.fieldname).toLowerCase();


        //await uploadFile(req, res); 

        // Générez un nouveau nom de fichier unique
        const newFileName = `${Date.now()}${path.extname(req.file.originalname)}`;

        // Renommez le fichier et stockez-le dans le dossier public
        const filePath = path.join(__dirname, '../public/produits', newFileName);
        await fs.writeFile(filePath, req.file.buffer);


        if (req.file == undefined) {
            return res.status(400).send({ message: "Aucun fichier téléversé!" });
        }

        const produit = new ProduitsModel({
            titre: req.body.titre,
            description: req.body.description,
            categorieId: req.body.categorieId,
            taille: req.body.taille,
            couleur: req.body.couleur,
            prix: req.body.prix,
            image: newFileName
        })

        //Save produit dans la db
        await produit.save(produit).then(data => {
            res.status(200).send({
                message: "Enregistrement effectué avec succès !",
                produits: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de l'enregistrement"
            });
        });

    },

    //FindOne
    findOne: async (req, res) => {
        // const produit = await ProduitsModel.findById(req.params.id).populate({ path: 'categorieId.id', select: 'libelle' })
        // res.status(200).send(produit)

        try {
            let data = await ProduitsModel.findById(req.params.id).populate('categorieId')
            res.status(200).send({ produit: data, success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    //Update

    update: async (req, res) => {
        //Check si le les données ont été envoyées
        if (!req.body) {
            res.status(400).send({
                message: "Les données à mettre à jour ne peuvent pas être vides !"
            });
        }

        const id = req.params.id;
        await ProduitsModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Aucun élément correspondant`
                });
            } else {
                res.status(200).send({ message: "Modification effectuée avec succès !" })
            }
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })

    },

    //Delete data
    destroy: async (req, res) => {
        await ProduitsModel.findByIdAndRemove(req.params.id, res).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Aucun élément correspondant`
                });
            } else {
                res.status(200).send({
                    message: "Suppression effectuée avec succès !"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    }


}

module.exports = dataController;
