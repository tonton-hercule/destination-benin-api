const util = require("util");
const multer = require("multer");
const path = require('path');


const maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        // Récupérez l'extension du fichier
        const fileExtension = path.extname(file.originalname).toLowerCase();

        //var fileExtension = file.originalname.split('.').pop();
        //if (!['png', 'jpg', 'jpeg'].includes(fileExtension)) {
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;