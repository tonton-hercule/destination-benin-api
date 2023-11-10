const multer = require('multer');

//Importer les controllers
const CategoriesController = require("../controllers/Categories");
const ProduitsController = require("../controllers/Produits")
const RolesController = require("../controllers/Roles")
const UsersController = require("../controllers/Users")
const authController = require("../controllers/auth")

const { checkToken } = require("./verifyToken");

// Configuration de multer pour stocker les fichiers téléversés en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Route sans authentification
const router = require("express").Router()

//Routes auth
const authRouter = require("express").Router()
authRouter.use(checkToken);


let routes = (app) => {

    ///##### AUTHENTIFICATION ########//
    router.post('/api/auth/register', authController.register)

    router.post('/api/auth/login', authController.login)

    //###CATEGORIES #######///
    router.get("/api/categories", CategoriesController.findAll)

    router.post("/api/categories", CategoriesController.create)

    router.get("/api/categories/:id", CategoriesController.findOne)

    router.put("/api/categories/:id", CategoriesController.update)

    router.delete("/api/categories/:id", CategoriesController.destroy)

    //###ROLES #######///
    authRouter.get("/api/roles", RolesController.findAll);

    authRouter.post("/api/roles", RolesController.create);

    authRouter.get("/api/roles/:id", RolesController.findOne);

    authRouter.put("/api/roles/:id", RolesController.update);

    authRouter.delete("/api/roles/:id", RolesController.destroy);

    //###USERS #######///
    authRouter.get("/api/users", UsersController.findAll)

    //###PRODUITS #######///
    authRouter.get("/api/produits", ProduitsController.findAll)

    authRouter.post("/api/produits", upload.single('couverture'), ProduitsController.create)

    authRouter.get("/api/produits/:id", ProduitsController.findOne)

    authRouter.put("/api/produits/:id", ProduitsController.update)

    authRouter.delete("/api/produits/:id", ProduitsController.destroy)

    app.use(router);
    app.use(authRouter);

};


module.exports = routes