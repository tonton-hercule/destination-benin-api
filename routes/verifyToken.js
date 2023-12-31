const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
    //Recuperer le token dans l'entête des requetes
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(" ")[1] //get token
        //Check si le token est valide
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).send({ message: "Le token est invalide !"})
                return
            }
            //Si le token est valide
            req.user = user;
            next()
        })
    } else {
        res.status(401).send({ message: "Vous n'êtes pas authentifié !" })
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    checkToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(401).send({ message: "Vous n'êtes pas un administrateur !" })
        }
    })
}

module.exports = { checkToken, verifyTokenAndAdmin }