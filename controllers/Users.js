const UsersModel = require("../models/Users")

const dataController = {
    /**Define all function of this controller */    
    findAll: async (req, res) => {
        await UsersModel.find().sort({ _id: -1 }).limit(2).then(data => {
            res.status(200).send({ users: data })
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la récupération des données."
            }); 
        })
    }

}

module.exports= dataController;
