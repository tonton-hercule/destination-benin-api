//Importer le model
const db = require("../models");
const Statuts = db.statuts;

//Create and save fonction
exports.create = async (req, res) => {
    if (!req.body.libelle) {
        res.status(400).send({
            message: "Le libelle est obligatoire !"
        });

        return;
    }

    //Create statuts
    const statut = new Statuts({
        libelle: req.body.libelle,
        description: req.body.description
    });

    //Save statut dans la db
    await statut.save(statut).then(data => {
        res.send({
            message: "Enregistrement effectué avec succès !",
            //statuts: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de l'enregistrement"
        });
    });

};

//Get all statuts
exports.findAll = async (req, res) => {
    const libelle = req.query.libelle;
    var condition = libelle ? { libelle: { $regex: new RegExp(libelle), $options: "i" } } : {};

    await Statuts.find(condition)
        .then(data => {
            res.send({
                statuts: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des données."
            });
        });
};


//Find one element
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await Statuts.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Aucun élément correspondant à cet id :" + id })
        else res.send({ statut: data })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des données."
        })
    })
};


//Update data
exports.update = async (req, res) => {
    //Check si le les données ont été envoyées
    if (!req.body) {
        res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides !"
        });
    }

    const id = req.body.id;
    await Statuts.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Aucun élément correspondant`
            });
        }else{
            res.send({ message: "Modification effectuée avec succès !" })
        }
    }).catch(err => {
        res.status(500).send({ message : err.message })
    })
}

//Suppression de data
exports.destroy = async (req, res) => {
    await Statuts
}
