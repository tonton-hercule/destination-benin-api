const ProfilsModel = require("../models/Profils")

const dataController = {
    /**Define all function of this controller */
    findAll: async (req, res) => {
        await ProfilsModel.find().then(data => {
            res.status(200).send({ profils: data })
        }).catch(err => {
            res.status(500).json({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des données."
            });
        })
    },

    //Create function
    create: async (req, res) => {

        if (!req.body.libelle) {
            res.status(400).send({
                message: "Le libelle est obligatoire !"
            });

            return;
        }

        const profil = new ProfilsModel({
            libelle: req.body.libelle,
            description: req.body.description,
        })

        //Save profil dans la db
        await profil.save(profil).then(data => {
            res.status(200).send({
                message: "Enregistrement effectué avec succès !",
                profils: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de l'enregistrement"
            });
        });

    },

    //FindOne
    findOne: async (req, res) => {
        await ProfilsModel.findById(req.params.id).then(data => {
            res.status(200).send({ profil: data })
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    },

    //Update

    update: async (req, res) => {
        //Check si le les données ont été envoyées
        if (!req.body) {
            res.status(400).send({
                message: "Les données à mettre à jour ne peuvent pas être vides !"
            });
        }

        await ProfilsModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(data => {
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
        await ProfilsModel.findByIdAndRemove(req.params.id, res).then(data => {
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
