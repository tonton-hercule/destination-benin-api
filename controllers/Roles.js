const RolesModel = require("../models/Roles")

const dataController = {
    findAll: async (req, res) => {
        await RolesModel.find().then(data => {
            res.status(200).send({ roles: data })
        }).catch(err => {
            res.status(500).json({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des données."
            });
        })
    },


    create: async (req, res) => {
        if (!req.body.libelle) {
            res.status(400).send({
                message: "Le libelle est obligatoire !"
            });

            return;
        }

        const role = new RolesModel({
            libelle: req.body.libelle,
            description: req.body.description,
        })

        //Save role
        await role.save(role).then(data => {
            res.status(200).send({
                message: "Enregistrement effectué avec succès !",
                roles: data //Renvoyer les roles existants dans la db
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de l'enregistrement du role"
            });
        })
    },


    //FindOne
    findOne: async (req, res) => {
        await RolesModel.findById(req.params.id).then(data => {
            res.status(200).send({ role: data })
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

        await RolesModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(data => {
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
        await RolesModel.findByIdAndRemove(req.params.id, res).then(data => {
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

//Exporter le controller pour le rendre accessible dans toute l'application
module.exports = dataController