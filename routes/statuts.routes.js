module.exports = app => {
    const statuts = require("../app/controllers/statuts.controller");
    var router = require("express").Router();
    // Create a new Status
    router.post("/", statuts.create);

    //Get all statuts
    router.get("/", statuts.findAll);


    app.use("/api/statuts", router);

}