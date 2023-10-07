const CategoriesModel = require("../models/Categories")

const dataController = {
    /**Define all function of this controller */
    findAll: async (req, res) => {
        await CategoriesModel.find().then(data => {
            res.status(500).send({ categories: data })
        }).catch(err => {
            res.status(500).send({
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

        const categorie = new CategoriesModel({
            libelle: req.body.libelle,
            description: req.body.description,
        })

        //Save categorie dans la db
        await categorie.save(categorie).then(data => {
            res.send({
                message: "Enregistrement effectué avec succès !",
                categories: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de l'enregistrement"
            });
        });

    },

    //FindOne
    findOne: async (req, res) => {
        await CategoriesModel.findById(req.params.id).then(data => {
            res.status(500).send({ categorie: data })
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

        await CategoriesModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Aucun élément correspondant`
                });
            } else {
                res.send({ message: "Modification effectuée avec succès !" })
            }
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })

    },

    //Delete data
    destroy: async (req, res) => {
        await CategoriesModel.findByIdAndRemove(req.params.id, res).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Aucun élément correspondant`
                });
              } else {
                res.send({
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
